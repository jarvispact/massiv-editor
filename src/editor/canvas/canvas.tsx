import { getWebgl2Context, System, UBO } from 'massiv-3d';
import React, { useLayoutEffect, useRef } from 'react';
import { Box } from '../components/box';
import { useEngine } from '../../engine/engine';
import { initializeEngine, world } from '../../world';
import { PerspectiveCamera } from '../../engine/camera/perspective-camera';
import { createTrackballCameraSystem } from '../../engine/systems/test';
// import { createTrackballCameraSystem } from '../../engine/systems/create-trackball-camera-system';

export const Canvas = () => {
    const ref = useRef<HTMLCanvasElement>(null);
    const { setCanvas, setGL } = useEngine();

    useLayoutEffect(() => {
        let trackballCameraSystem: System = (null as any) as System;

        if (ref && ref.current) {
            ref.current.width = ref.current.clientWidth;
            ref.current.height = ref.current.clientHeight;
            setCanvas(ref.current);
            const gl = getWebgl2Context(ref.current);
            setGL(gl);

            const camera = new PerspectiveCamera({
                translation: [0, 2, 3],
                fov: 45,
                aspect: ref.current.width / ref.current.height,
                near: 0.01,
                far: 1000,
            });

            const ubo = new UBO(gl, 'CameraUniforms', 0, {
                'CameraUniforms.translation': { data: camera.translation },
                'CameraUniforms.viewMatrix': { data: camera.viewMatrix },
                'CameraUniforms.projectionMatrix': { data: camera.projectionMatrix },
            });

            initializeEngine(ref.current, gl, ubo);

            trackballCameraSystem = createTrackballCameraSystem(ref.current, camera, ubo);
            world.addSystem(trackballCameraSystem);
        }

        return () => {
            world.removeSystem(trackballCameraSystem);
        };
    }, []);

    return (
        <Box gridArea="canvas" bg="appBackground">
            <Box ref={ref} as="canvas" id="canvas" width="100%" height="100%" style={{ outline: 'none' }} />
        </Box>
    );
};
