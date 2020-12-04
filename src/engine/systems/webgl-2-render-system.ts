import {
    createMap,
    createWebgl2ArrayBuffer,
    createWebgl2ElementArrayBuffer,
    createWebgl2Program,
    createWebgl2Shader,
    createWebgl2VertexArray,
    Entity,
    Geometry,
    glsl300,
    setupWebgl2VertexAttribPointer,
    System,
    Transform,
    UBO,
} from 'massiv-3d';
import { Camera } from '../camera/camera';
import { world } from '../../world';
import { mat4, vec3 } from 'gl-matrix';

type CachedEntity = {
    update: () => void;
    cleanup: () => void;
};

const mapRgb = createMap(0, 255, 0, 1);

const cameraUBOConfig = {
    'CameraUniforms.translation': { data: vec3.fromValues(0, 0, 0) },
    'CameraUniforms.viewMatrix': { data: mat4.fromValues(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1) },
    'CameraUniforms.projectionMatrix': { data: mat4.fromValues(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1) },
};

type UBOConfig = typeof cameraUBOConfig;

export const createWebgl2RenderSystem = (canvas: HTMLCanvasElement, gl: WebGL2RenderingContext, cameraUBO: UBO<UBOConfig>): System => {
    gl.clearColor(mapRgb(237), mapRgb(242), mapRgb(247), 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const cache: Record<string, CachedEntity> = {};

    const createCachedEntity = (entity: Entity) => {
        const transform = entity.getComponentByClass(Transform);
        const geometry = entity.getComponentByClass(Geometry);

        const vs = glsl300({
            attributes: [
                { name: 'position', type: 'vec3', location: 0 },
                { name: 'normal', type: 'vec3', location: 1 },
            ],
            out: [{ name: 'vNormal', type: 'vec3' }],
        })`
            uniform CameraUniforms {
                vec3 translation;
                mat4 viewMatrix;
                mat4 projectionMatrix;
            } camera;

            uniform mat4 modelMatrix;

            void main() {
                mat4 modelViewMatrix = camera.viewMatrix * modelMatrix;
                mat3 normalMatrix = mat3(transpose(inverse(modelViewMatrix)));
                vNormal = normalMatrix * normal;
                gl_Position = camera.projectionMatrix * modelViewMatrix * vec4(position, 1.0);
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

        const vertexShader = createWebgl2Shader(gl, gl.VERTEX_SHADER, vs.sourceCode);
        const fragmentShader = createWebgl2Shader(gl, gl.FRAGMENT_SHADER, fs.sourceCode);
        const shaderProgram = createWebgl2Program(gl, vertexShader, fragmentShader);
        const vao = createWebgl2VertexArray(gl);

        const positionBuffer = createWebgl2ArrayBuffer(gl, geometry.data.positions);
        setupWebgl2VertexAttribPointer(gl, 0, 3);

        const normalBuffer = createWebgl2ArrayBuffer(gl, geometry.data.normals);
        setupWebgl2VertexAttribPointer(gl, 1, 3);

        const indexBuffer = createWebgl2ElementArrayBuffer(gl, geometry.data.indices);
        const indexCount = geometry.data.indices.length;

        gl.useProgram(shaderProgram);
        cameraUBO.bindToShaderProgram(shaderProgram);

        const modelMatrixLocation = gl.getUniformLocation(shaderProgram, 'modelMatrix');
        gl.uniformMatrix4fv(modelMatrixLocation, false, transform.data.modelMatrix);

        const cachedEntity = {
            update: () => {
                gl.useProgram(shaderProgram);
                gl.bindVertexArray(vao);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
                if (transform.isDirty()) {
                    gl.uniformMatrix4fv(modelMatrixLocation, false, transform.data.modelMatrix);
                    transform.setDirty(false);
                }
                gl.drawElements(gl.TRIANGLES, indexCount, gl.UNSIGNED_INT, 0);
            },
            cleanup: () => {
                gl.deleteShader(vertexShader);
                gl.deleteShader(fragmentShader);
                gl.deleteProgram(shaderProgram);
                gl.deleteBuffer(positionBuffer);
                gl.deleteBuffer(normalBuffer);
                gl.deleteVertexArray(vao);
                gl.deleteBuffer(indexBuffer);
            },
        };

        cache[entity.name] = cachedEntity;
        return cachedEntity;
    };

    return () => {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        const entities = world.queryEntities(['Transform', 'Geometry']);
        for (let e = 0; e < entities.length; e++) {
            const entity = entities[e];
            if (!cache[entity.name]) createCachedEntity(entity);
            cache[entity.name].update();
        }
    };
};
