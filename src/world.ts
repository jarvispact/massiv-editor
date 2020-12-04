import { mat4, vec3 } from 'gl-matrix';
import { Transform, UBO, World } from 'massiv-3d';
import { PerspectiveCamera } from './engine/camera/perspective-camera';
import { createRenderBoundingBoxSystem } from './engine/systems/render-bounding-box-system';
import { createWebgl2RenderSystem } from './engine/systems/webgl-2-render-system';

const initialState = { autoUpdate: true };
type State = typeof initialState;

const toggleAutoUpdate = () => ({ type: 'TOGGLE-AUTO-UPDATE' } as const);

export const worldActions = {
    toggleAutoUpdate,
};

const actionValues = Object.values(worldActions)[0];
type Action = ReturnType<typeof actionValues>;

export const world = new World<State, Action>({
    initialState,
    reducer: (state, action) => {
        switch (action.type) {
            case 'TOGGLE-AUTO-UPDATE':
                return { ...state, autoUpdate: !state.autoUpdate };
            default:
                return state;
        }
    },
});

const cameraUBOConfig = {
    'CameraUniforms.translation': { data: vec3.fromValues(0, 0, 0) },
    'CameraUniforms.viewMatrix': { data: mat4.fromValues(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1) },
    'CameraUniforms.projectionMatrix': { data: mat4.fromValues(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1) },
};

type UBOConfig = typeof cameraUBOConfig;

export const initializeEngine = async (canvas: HTMLCanvasElement, gl: WebGL2RenderingContext, cameraUBO: UBO<UBOConfig>) => {
    world.addSystem(createWebgl2RenderSystem(canvas, gl, cameraUBO));
    world.addSystem(createRenderBoundingBoxSystem(canvas, gl, cameraUBO));

    // world.addSystem((delta) => {
    //     const entities = world.queryEntities(['Transform']);
    //     entities.forEach((e) => {
    //         const t = e.getComponentByClass(Transform);
    //         if (world.state.autoUpdate) t.rotate(0, 45 * delta, 0).update();
    //     });
    // });

    const tick = (time: number) => {
        world.update(time);
        window.requestAnimationFrame(tick);
    };

    window.requestAnimationFrame(tick);
};
