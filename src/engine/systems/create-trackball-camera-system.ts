import { mat4, vec3 } from 'gl-matrix';
import { System, UBO, MouseInput } from 'massiv-3d';
import { Camera } from '../camera/camera';

const cameraUBOConfig = {
    'CameraUniforms.translation': { data: vec3.fromValues(0, 0, 0) },
    'CameraUniforms.viewMatrix': { data: mat4.fromValues(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1) },
    'CameraUniforms.projectionMatrix': { data: mat4.fromValues(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1) },
};

type UBOConfig = typeof cameraUBOConfig;

export const createTrackballCameraSystem = (canvas: HTMLCanvasElement, camera: Camera, cameraUbo: UBO<UBOConfig>): System => {
    const mouseInput = new MouseInput(canvas);

    let lastMouseX = 0;
    let lastMouseY = 0;
    let wheelDelta = 0;

    const mat4CacheX = mat4.create();
    const mat4CacheY = mat4.create();

    return (delta: number) => {
        const mouseX = mouseInput.getMouseX();
        const mouseY = mouseInput.getMouseY();
        const movementX = (mouseX - lastMouseX) * delta;
        const movementY = (lastMouseY - mouseY) * delta;

        if (mouseInput.isButtonDown('PRIMARY')) {
            mat4.lookAt(camera.viewMatrix, camera.translation, camera.lookAtVector, camera.upVector);
            mat4.rotateY(mat4CacheY, mat4CacheY, movementX);
            mat4.rotateX(mat4CacheX, mat4CacheX, -movementY);
            mat4.multiply(camera.viewMatrix, camera.viewMatrix, mat4CacheX);
            mat4.multiply(camera.viewMatrix, camera.viewMatrix, mat4CacheY);
            cameraUbo.setView('CameraUniforms.viewMatrix', camera.viewMatrix).update();
        }

        const wheelY = mouseInput.getWheelY();
        if (wheelY !== 0) {
            wheelDelta += (wheelY / 10) * delta;
            camera.setTranslation(camera.translation[0], camera.translation[0], camera.translation[0] + wheelDelta);
            cameraUbo.setView('CameraUniforms.translation', camera.translation).setView('CameraUniforms.viewMatrix', camera.viewMatrix).update();
        }

        lastMouseX = mouseX;
        lastMouseY = mouseY;
    };
};
