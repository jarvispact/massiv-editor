import { mat3, mat4, vec3 } from 'gl-matrix';
import {
    createTexture2D,
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
import { PerspectiveCamera } from '../components/perspective-camera';
import { Renderable } from '../components/renderable';
import { Transform } from '../components/transform';

type RenderSystemArgs = {
    canvas: HTMLCanvasElement;
    world: World;
    gl: WebGL2RenderingContext;
    colorRaster: HTMLImageElement;
};

const vs = glsl300({
    attributes: [GLSL300ATTRIBUTE.POSITION, GLSL300ATTRIBUTE.UV, GLSL300ATTRIBUTE.NORMAL],
    out: [
        { name: 'vUv', type: 'vec2' },
        { name: 'vNormal', type: 'vec3' },
    ],
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
        vUv = uv;
        vNormal = normalMatrix * normal;
        gl_Position = camera.projectionMatrix * camera.viewMatrix * modelMatrix * vec4(position, 1.0);
    }
`;

const fs = glsl300({
    in: vs.config.out,
    out: [{ name: 'fragColor', type: 'vec4' }],
})`
    uniform sampler2D colorRaster;

    vec3 lightDirection = vec3(3.0, 1.0, 1.0);
    vec3 lightDiffuse = vec3(0.8, 0.8, 0.8);

    void main() {
        vec3 texel = texture(colorRaster, vUv).rgb;
        vec3 ambient = texel * 0.2;
        vec3 direction = normalize(lightDirection);
        vec3 normal = normalize(vNormal);
        float diff = max(dot(normal, direction), 0.0);
        vec3 diffuse = lightDiffuse * diff * texel;
        fragColor = vec4(ambient + diffuse, 1.0);
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

export const createRenderSystem = ({ canvas, world, gl, colorRaster }: RenderSystemArgs): System => {
    const vertexShader = createWebgl2Shader(gl, gl.VERTEX_SHADER, vs.sourceCode);
    const fragmentShader = createWebgl2Shader(gl, gl.FRAGMENT_SHADER, fs.sourceCode);
    const shaderProgram = createWebgl2Program(gl, vertexShader, fragmentShader);
    gl.useProgram(shaderProgram);

    const modelMatrixLocation = gl.getUniformLocation(shaderProgram, 'modelMatrix');
    const normalMatrixLocation = gl.getUniformLocation(shaderProgram, 'normalMatrix');
    const colorRasterLocation = gl.getUniformLocation(shaderProgram, 'colorRaster');
    const colorRasterTexture = createTexture2D(gl, colorRaster);
    gl.activeTexture(gl.TEXTURE0 + 0);
    gl.bindTexture(gl.TEXTURE_2D, colorRasterTexture);
    gl.uniform1i(colorRasterLocation, 0);

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
            const camera = action.payload.getComponentByClass(PerspectiveCamera);
            const transform = action.payload.getComponentByClass(Transform);
            const renderable = action.payload.getComponentByClass(Renderable);
            if (camera) {
                cameraCache.camera = camera;
            } else if (transform && renderable) {
                const vao = createWebgl2VertexArray(gl);

                const positionBuffer = createWebgl2ArrayBuffer(gl, new Float32Array(renderable.data.positions));
                setupWebgl2VertexAttribPointer(gl, GLSL300ATTRIBUTE.POSITION.location, 3);

                const uvBuffer = createWebgl2ArrayBuffer(gl, new Float32Array(renderable.data.uvs));
                setupWebgl2VertexAttribPointer(gl, GLSL300ATTRIBUTE.UV.location, 2);

                const normalBuffer = createWebgl2ArrayBuffer(gl, new Float32Array(renderable.data.normals));
                setupWebgl2VertexAttribPointer(gl, GLSL300ATTRIBUTE.NORMAL.location, 3);

                cache.push({
                    entityName: action.payload.name,
                    update: () => {
                        mat4.multiply(modelViewMatrix, cameraCache.camera.data.viewMatrix, transform.data.modelMatrix);
                        mat3.normalFromMat4(normalMatrix, modelViewMatrix);
                        gl.uniformMatrix4fv(modelMatrixLocation, false, transform.data.modelMatrix);
                        gl.uniformMatrix3fv(normalMatrixLocation, false, normalMatrix);
                        gl.bindVertexArray(vao);
                        gl.drawArrays(gl.TRIANGLES, 0, renderable.data.positions.length);
                    },
                    cleanup: () => {
                        gl.deleteBuffer(positionBuffer);
                        gl.deleteBuffer(uvBuffer);
                        gl.deleteBuffer(normalBuffer);
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
