import {
    createWebgl2ArrayBuffer,
    createWebgl2ElementArrayBuffer,
    createWebgl2Program,
    createWebgl2Shader,
    createWebgl2VertexArray,
    Entity,
    glsl300,
    setupWebgl2VertexAttribPointer,
    System,
    UBO,
} from 'massiv-3d';
import { Transform } from '../components/transform';
import { Geometry } from '../components/geometry';
import { Camera } from '../camera/camera';
import { OrthographicCamera } from '../camera/orthographic-camera';
import { world } from '../../world';

type CachedEntity = {
    update: () => void;
    cleanup: () => void;
};

const createMap = (in_min: number, in_max: number, out_min: number, out_max: number) => (value: number) =>
    ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;

const mapRgb = createMap(0, 255, 0, 1);

export const createWebgl2RenderSystem = (
    canvas: HTMLCanvasElement,
    gl: WebGL2RenderingContext,
    camera: Camera,
): System => {
    gl.clearColor(mapRgb(237), mapRgb(242), mapRgb(247), 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const cache: Record<string, CachedEntity> = {};

    const ubo = new UBO(gl, 'CameraUniforms', 0, {
        'CameraUniforms.translation': { data: camera.translation },
        'CameraUniforms.viewMatrix': { data: camera.viewMatrix },
        'CameraUniforms.projectionMatrix': { data: camera.projectionMatrix },
    });

    window.addEventListener('resize', () => {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);

        const aspect = canvas.width / canvas.height;
        if (camera instanceof OrthographicCamera) {
            camera.setFrustum(-aspect * 10, aspect * 10, -10, 10, -10, 10);
            ubo.setView('CameraUniforms.projectionMatrix', camera.projectionMatrix).update();
        }
    });

    const createCachedEntity = (entity: Entity) => {
        const transform = entity.getComponent('Transform') as Transform;
        const geometry = entity.getComponent('Geometry') as Geometry;

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
        ubo.bindToShaderProgram(shaderProgram);

        const modelMatrixLocation = gl.getUniformLocation(shaderProgram, 'modelMatrix');
        gl.uniformMatrix4fv(modelMatrixLocation, false, transform.data.modelMatrix);

        const cachedEntity = {
            update: () => {
                gl.useProgram(shaderProgram);
                gl.bindVertexArray(vao);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
                if (Transform.isDirty(transform)) {
                    gl.uniformMatrix4fv(modelMatrixLocation, false, transform.data.modelMatrix);
                    Transform.setDirty(transform, false);
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
