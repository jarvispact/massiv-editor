import { mat4, vec3 } from 'gl-matrix';
import { System, UBO, MouseInput } from 'massiv-3d';
import { Camera } from '../camera/camera';

const cameraUBOConfig = {
    'CameraUniforms.translation': { data: vec3.fromValues(0, 0, 0) },
    'CameraUniforms.viewMatrix': { data: mat4.fromValues(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1) },
    'CameraUniforms.projectionMatrix': { data: mat4.fromValues(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1) },
};

type UBOConfig = typeof cameraUBOConfig;

const sphericalToCartesian = (radius: number, phi: number, theta: number) => {
    const vec = vec3.create();
    const sinPhiRadius = Math.sin(phi) * radius;
    vec[0] = sinPhiRadius * Math.sin(theta);
    vec[1] = Math.cos(phi) * radius;
    vec[2] = sinPhiRadius * Math.cos(theta);
    return vec;
};

const cartesianToSpherical = (x: number, y: number, z: number) => {
    const vec = vec3.create(); // radius, phi, theta
    vec[0] = Math.sqrt(x * x + y * y + z * z);

    if (vec[0] === 0) {
        vec[1] = 0;
        vec[2] = 0;
    } else {
        vec[1] = Math.acos(Math.min(Math.max(y / vec[0], -1), 1));
        vec[2] = Math.atan2(x, z);
    }

    return vec;
};

export const createTrackballCameraSystem = (canvas: HTMLCanvasElement, camera: Camera, cameraUbo: UBO<UBOConfig>): System => {
    const mouseInput = new MouseInput(canvas);

    let lastMouseX = 0;
    let lastMouseY = 0;
    const wheelDelta = 0;

    const sphericalCoords = cartesianToSpherical(camera.translation[0], camera.translation[1], camera.translation[2]);

    return (delta: number) => {
        const mouseX = mouseInput.getMouseX();
        const mouseY = mouseInput.getMouseY();
        const movementX = (mouseX - lastMouseX) * delta;
        const movementY = (lastMouseY - mouseY) * delta;

        if (mouseInput.isButtonDown('PRIMARY')) {
            sphericalCoords[2] -= movementX;
            sphericalCoords[1] += movementY;
            const translation = sphericalToCartesian(sphericalCoords[0], sphericalCoords[1], sphericalCoords[2]);
            camera.setTranslation(translation[0], translation[1], translation[2] + wheelDelta);
            camera.lookAt(0, 0, 0);
            cameraUbo.setView('CameraUniforms.translation', camera.translation).setView('CameraUniforms.viewMatrix', camera.viewMatrix).update();
        }

        const wheel = mouseInput.getWheelY();
        if (wheel !== 0) {
            sphericalCoords[0] += (wheel / 10) * delta;
            const translation = sphericalToCartesian(sphericalCoords[0], sphericalCoords[1], sphericalCoords[2]);
            camera.setTranslation(translation[0], translation[1], translation[2] + wheelDelta);
            camera.lookAt(0, 0, 0);
            cameraUbo.setView('CameraUniforms.translation', camera.translation).setView('CameraUniforms.viewMatrix', camera.viewMatrix).update();
        }

        lastMouseX = mouseX;
        lastMouseY = mouseY;
    };
};
