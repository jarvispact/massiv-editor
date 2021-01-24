import { mat3, mat4, vec3 } from 'gl-matrix';
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
import { ActiveCameraTag } from '../components/active-camera-tag';
import { Geometry } from '../components/geometry';
import { NormalMaterial } from '../components/normal-material';
import { PerspectiveCamera } from '../components/perspective-camera';
import { RenderableTag } from '../components/renderable-tag';
import { Transform } from '../components/transform';

type RenderSystemArgs = {
    canvas: HTMLCanvasElement;
    world: World;
    gl: WebGL2RenderingContext;
};

const vs = glsl300({
    attributes: [GLSL300ATTRIBUTE.POSITION, GLSL300ATTRIBUTE.UV, GLSL300ATTRIBUTE.NORMAL],
    out: [{ name: 'vNormal', type: 'vec3' }],
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
    uniform mat3 normalMatrix;

    void main() {
        vNormal = normalMatrix * normal;
        gl_Position = camera.projectionMatrix * camera.viewMatrix * modelMatrix * vec4(position, 1.0);
    }
`;

const fs = glsl300({
    in: vs.config.out,
    out: [{ name: 'fragColor', type: 'vec4' }],
})`
    void main() {
        fragColor = vec4(normalize(vNormal), 1.0);
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
    const normalMatrixLocation = gl.getUniformLocation(shaderProgram, 'normalMatrix');

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

    const modelViewMatrix = mat4.create();
    const normalMatrix = mat3.create();

    world.subscribe((action) => {
        if (action.type === 'ADD-ENTITY') {
            const activeCamera = world.getComponent(action.payload, ActiveCameraTag);
            const transform = world.getComponent(action.payload, Transform);
            const renderable = world.getComponent(action.payload, RenderableTag);
            const material = world.getComponent(action.payload, NormalMaterial);
            const geometry = world.getComponent(action.payload, Geometry);

            if (activeCamera) {
                cameraCache.camera = world.getComponent(action.payload, PerspectiveCamera);
            } else if (transform && renderable) {
                const vao = createWebgl2VertexArray(gl);

                const positionBuffer = createWebgl2ArrayBuffer(gl, new Float32Array(geometry.data.positions));
                setupWebgl2VertexAttribPointer(gl, GLSL300ATTRIBUTE.POSITION.location, 3);

                let normalBuffer: WebGLBuffer;
                if (geometry.data.normals) {
                    normalBuffer = createWebgl2ArrayBuffer(gl, new Float32Array(geometry.data.normals));
                    setupWebgl2VertexAttribPointer(gl, GLSL300ATTRIBUTE.NORMAL.location, 3);
                }

                cache.push({
                    entityName: action.payload,
                    update: () => {
                        mat4.multiply(modelViewMatrix, cameraCache.camera.data.viewMatrix, transform.data.modelMatrix);
                        mat3.normalFromMat4(normalMatrix, modelViewMatrix);
                        gl.uniformMatrix4fv(modelMatrixLocation, false, transform.data.modelMatrix);
                        gl.uniformMatrix3fv(normalMatrixLocation, false, normalMatrix);
                        gl.bindVertexArray(vao);
                        gl.drawArrays(gl.TRIANGLES, 0, geometry.data.positions.length);
                    },
                    cleanup: () => {
                        gl.deleteBuffer(positionBuffer);
                        gl.deleteBuffer(normalBuffer);
                        gl.deleteVertexArray(vao);
                    },
                });
            }
        } else if (action.type === 'REMOVE-ENTITY') {
            for (let i = 0; i < cache.length; i++) {
                const cachedItem = cache[i];
                if (cachedItem && cachedItem.entityName === action.payload) {
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
