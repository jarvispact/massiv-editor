import { mat4, vec3 } from 'gl-matrix';
import {
    createWebgl2ArrayBuffer,
    createWebgl2Program,
    createWebgl2Shader,
    createWebgl2VertexArray,
    glsl300,
    GLSL300ATTRIBUTE,
    Nullable,
    setupWebgl2VertexAttribPointer,
    System,
    UBO,
    World,
} from 'massiv-3d';
import { Geometry } from '../components/geometry';
import { PerspectiveCamera } from '../components/perspective-camera';
import { Transform } from '../components/transform';

type RenderSystemArgs = {
    canvas: HTMLCanvasElement;
    world: World;
    gl: WebGL2RenderingContext;
};

const vs = glsl300({
    attributes: [GLSL300ATTRIBUTE.POSITION],
})`
    struct Camera {
        vec3 translation;
        mat4 viewMatrix;
        mat4 projectionMatrix;
    };

    uniform CameraUniforms {
        Camera camera;
    };

    uniform mat4 modelMatrix;

    void main() {
        gl_Position = camera.projectionMatrix * camera.viewMatrix * modelMatrix * vec4(position, 1.0);
    }
`;

const fs = glsl300({
    out: [{ name: 'fragColor', type: 'vec4' }],
})`
    void main() {
        fragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
`;

const cameraUboConfig = {
    'camera.translation': vec3.create(),
    'camera.viewMatrix': mat4.create(),
    'camera.projectionMatrix': mat4.create(),
};

type CachedCamera = {
    camera: PerspectiveCamera;
    ubo: UBO<typeof cameraUboConfig>;
};

type CachedItem = {
    entityName: string;
    update: () => void;
    cleanup: () => void;
};

export const createRenderSystem = ({ canvas, world, gl }: RenderSystemArgs): System => {
    const vertexShader = createWebgl2Shader(gl, gl.VERTEX_SHADER, vs.sourceCode);
    const fragmentShader = createWebgl2Shader(gl, gl.FRAGMENT_SHADER, fs.sourceCode);
    const shaderProgram = createWebgl2Program(gl, vertexShader, fragmentShader);
    gl.useProgram(shaderProgram);

    const modelMatrixLocation = gl.getUniformLocation(shaderProgram, 'modelMatrix');

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const cameraCache: CachedCamera = {
        ubo: new UBO(gl, 'CameraUniforms', 0, cameraUboConfig).bindToShaderProgram(shaderProgram),
    };

    const cache: Array<Nullable<CachedItem>> = [];

    window.addEventListener('unload', () => {
        for (let i = 0; i < cache.length; i++) {
            const cachedItem = cache[i];
            if (cachedItem) cachedItem.cleanup();
        }
    });

    window.addEventListener('resize', () => {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
        cameraCache.camera.setAspect(canvas.width / canvas.height);
    });

    world.subscribe((action) => {
        if (action.type === 'ADD-ENTITY') {
            const camera = action.payload.getComponentByClass(PerspectiveCamera);
            const geometry = action.payload.getComponentByClass(Geometry);
            const transform = action.payload.getComponentByClass(Transform);
            if (camera) {
                cameraCache.camera = camera;
            } else if (geometry && transform) {
                const vao = createWebgl2VertexArray(gl);
                const positionBuffer = createWebgl2ArrayBuffer(gl, geometry.data.positions);
                setupWebgl2VertexAttribPointer(gl, GLSL300ATTRIBUTE.POSITION.location, 3);

                cache.push({
                    entityName: action.payload.name,
                    update: () => {
                        gl.uniformMatrix4fv(modelMatrixLocation, false, transform.data.modelMatrix);
                        gl.bindVertexArray(vao);
                        gl.drawArrays(gl.TRIANGLES, 0, geometry.data.positions.length);
                    },
                    cleanup: () => {
                        gl.deleteBuffer(positionBuffer);
                        gl.deleteVertexArray(vao);
                    },
                });
            }
        } else if (action.type === 'REMOVE-ENTITY') {
            for (let i = 0; i < cache.length; i++) {
                const cachedItem = cache[i];
                if (cachedItem && cachedItem.entityName === action.payload.name) {
                    cachedItem.cleanup();
                    cache[i] = null;
                }
            }
        }
    });

    return () => {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        if (cameraCache.camera.data.dirty) {
            cameraCache.camera.data.dirty = false;
            cameraCache.ubo
                .setVec3('camera.translation', cameraCache.camera.data.translation)
                .setMat4('camera.viewMatrix', cameraCache.camera.data.viewMatrix)
                .setMat4('camera.projectionMatrix', cameraCache.camera.data.projectionMatrix)
                .update();
        }

        for (let i = 0; i < cache.length; i++) {
            const cachedItem = cache[i];
            if (cachedItem) cachedItem.update();
        }
    };
};
