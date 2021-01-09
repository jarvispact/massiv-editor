import { createMap, degreesToRadians, Entity, MouseInput } from 'massiv-3d';
import React, { useContext, useEffect, useState } from 'react';
import { world } from './world';
import { PerspectiveCamera } from './components/perspective-camera';
import { Geometry } from './components/geometry';
import { createRenderSystem } from './systems/render-system';
import { useTheme } from 'massiv-design-system';
import { Theme } from '../themes';
import { Transform } from './components/transform';
import { createOrbitCameraSystem } from './systems/orbit-camera-system';

type Ctx = {
    canvas: HTMLCanvasElement;
    gl: WebGL2RenderingContext;
    setCanvas: React.Dispatch<React.SetStateAction<HTMLCanvasElement>>;
    setGL: React.Dispatch<React.SetStateAction<WebGL2RenderingContext>>;
};

export const EngineContext = React.createContext<Ctx>({
    canvas: (null as any) as HTMLCanvasElement,
    gl: (null as any) as WebGL2RenderingContext,
    setCanvas: () => {},
    setGL: () => {},
});

type Props = {
    children: React.ReactNode;
};

const colorMapper = createMap(0, 255, 0, 1);

const initEngine = (canvas: HTMLCanvasElement, gl: WebGL2RenderingContext) => {
    gl.clearColor(colorMapper(45), colorMapper(55), colorMapper(72), 1); // initial dark theme color: [45, 55, 72]\

    const mouseInput = new MouseInput(canvas);
    world.addSystem(createOrbitCameraSystem({ mouseInput, world }));
    world.addSystem(createRenderSystem({ world, canvas, gl }));

    const camera = new PerspectiveCamera({ translation: [0, 2, 5], aspect: canvas.width / canvas.height });
    camera.lookAt([0, 0, 0]);
    world.addEntity(new Entity('DefaultCamera', [camera]));

    world.addEntity(
        new Entity(`DemoTriangle-${Math.random()}`, [
            new Transform({ translation: [0, 0, 0] }),
            new Geometry({
                positions: [-1, 0, 1, 1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, -1, 0, -1],
            }),
        ]),
    );

    const tick = (time: number) => {
        world.update(time);
        window.requestAnimationFrame(tick);
    };

    window.requestAnimationFrame(tick);
};

const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
};

export const EngineProvider = ({ children }: Props) => {
    const [canvas, setCanvas] = useState<HTMLCanvasElement>((null as any) as HTMLCanvasElement);
    const [gl, setGL] = useState<WebGL2RenderingContext>((null as any) as WebGL2RenderingContext);
    const { theme } = useTheme<Theme>();

    useEffect(() => {
        const appBG = hexToRgb(theme.color.appBackground);
        if (gl && appBG) gl.clearColor(colorMapper(appBG[0]), colorMapper(appBG[1]), colorMapper(appBG[2]), 1);
    }, [theme]);

    useEffect(() => {
        if (canvas && gl) initEngine(canvas, gl);
    }, [canvas, gl]);

    const context: Ctx = {
        canvas,
        gl,
        setCanvas,
        setGL,
    };

    return <EngineContext.Provider value={context}>{children}</EngineContext.Provider>;
};

export const useEngine = () => useContext(EngineContext);
