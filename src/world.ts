import { World } from 'massiv-3d';
import { PerspectiveCamera } from './engine/camera/perspective-camera';
import { Transform } from './engine/components/transform';
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

export const initializeEngine = async (canvas: HTMLCanvasElement, gl: WebGL2RenderingContext) => {
    const camera = new PerspectiveCamera({
        translation: [0, 2, 3],
        fov: 45,
        aspect: canvas.width / canvas.height,
        near: 0.01,
        far: 1000,
    });

    world.addSystem(createWebgl2RenderSystem(canvas, gl, camera));

    world.addSystem((delta) => {
        const entities = world.queryEntities(['Transform']);
        entities.forEach((e) => {
            const t = e.getComponent('Transform') as Transform;
            if (world.state.autoUpdate) Transform.rotate(t, 0, 45 * delta, 0);
        });
    });

    const tick = (time: number) => {
        world.update(time);
        window.requestAnimationFrame(tick);
    };

    window.requestAnimationFrame(tick);
};
