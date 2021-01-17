import { vec3 } from 'gl-matrix';
import { MouseInput, Nullable, System, World, cartesianToSpherical, sphericalToCartesian, lerp } from 'massiv-3d';
import { PerspectiveCamera } from '../components/perspective-camera';

type OrbitCameraSystemArgs = {
    mouseInput: MouseInput;
    world: World;
};

export const createOrbitCameraSystem = ({ mouseInput, world }: OrbitCameraSystemArgs): System => {
    let lastMouseX = 0;
    let lastMouseY = 0;

    const spherical = vec3.create();
    const cartesian = vec3.create();
    const center = vec3.create();
    let camera: Nullable<PerspectiveCamera> = null;

    world.subscribe((action) => {
        if (action.type === 'ADD-ENTITY' && action.payload.name === 'DefaultCamera') {
            camera = action.payload.getComponentByClass(PerspectiveCamera);
        } else if (action.type === 'REMOVE-ENTITY' && action.payload.name === 'DefaultCamera') {
            camera = null;
        }
    });

    return (delta) => {
        if (camera) {
            const mouseX = mouseInput.getMouseX();
            const mouseY = mouseInput.getMouseY();
            const wheel = mouseInput.getWheelY() * delta;

            cartesianToSpherical(spherical, camera.data.translation[0], camera.data.translation[1], camera.data.translation[2]);

            if (mouseInput.isButtonDown('AUXILIARY')) {
                const movementX = (mouseX - lastMouseX) * delta;
                const movementY = (lastMouseY - mouseY) * delta;
                spherical[1] = lerp(spherical[1], spherical[1] + movementY, 0.1);
                spherical[2] = lerp(spherical[2], spherical[2] - movementX, 0.1);
                if (spherical[1] > 1.4) spherical[1] = 1.4;
                if (spherical[1] < 0.1) spherical[1] = 0.1;
            }

            if (wheel !== 0) spherical[0] = lerp(spherical[0], spherical[0] + wheel, 0.1);
            if (spherical[0] < 0.5) spherical[0] = 0.5;

            sphericalToCartesian(cartesian, spherical[0], spherical[1], spherical[2]);
            camera.setTranslation(cartesian[0], cartesian[1], cartesian[2]).lookAt(center);

            lastMouseX = mouseX;
            lastMouseY = mouseY;
        }
    };
};
