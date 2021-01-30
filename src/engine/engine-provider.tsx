import { createMap, MouseInput, Nullable } from 'massiv-3d';
import React, { useContext, useEffect, useState } from 'react';
import { PerspectiveCamera } from './components/perspective-camera';
import { createRenderSystem } from './systems/render-system';
import { useTheme } from 'massiv-design-system';
import { Theme } from '../themes';
import { createOrbitCameraSystem } from './systems/orbit-camera-system';
import { ActiveCameraTag } from './components/active-camera-tag';
import { world } from '../world';

type Ctx = {
    canvas: HTMLCanvasElement;
    gl: WebGL2RenderingContext;
    selectedEntity: Nullable<string>;
    setCanvas: React.Dispatch<React.SetStateAction<HTMLCanvasElement>>;
    setGL: React.Dispatch<React.SetStateAction<WebGL2RenderingContext>>;
    setSelectedEntity: React.Dispatch<React.SetStateAction<Nullable<string>>>;
};

export const EngineContext = React.createContext<Ctx>({
    canvas: (null as any) as HTMLCanvasElement,
    gl: (null as any) as WebGL2RenderingContext,
    selectedEntity: null,
    setCanvas: () => {},
    setGL: () => {},
    setSelectedEntity: () => {},
});

type Props = {
    children: React.ReactNode;
};

const colorMapper = createMap(0, 255, 0, 1);

const initEngine = async (canvas: HTMLCanvasElement, gl: WebGL2RenderingContext, theme: Theme) => {
    const rgb = hexToRgb(theme.color.canvasBackground);
    if (rgb) gl.clearColor(colorMapper(rgb[0]), colorMapper(rgb[1]), colorMapper(rgb[2]), 1);

    const mouseInput = new MouseInput(canvas);
    world.addSystem(createOrbitCameraSystem({ mouseInput, world }));
    world.addSystem(createRenderSystem({ world, canvas, gl }));

    world.addEntity('DefaultCamera', [
        new PerspectiveCamera({ translation: [0, 2, 5], aspect: canvas.width / canvas.height }).lookAt(0, 0, 0),
        new ActiveCameraTag(),
    ]);

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
    const [selectedEntity, setSelectedEntity] = useState<Nullable<string>>(null);
    const { theme } = useTheme<Theme>();

    useEffect(() => {
        const appBG = hexToRgb(theme.color.canvasBackground);
        if (gl && appBG) gl.clearColor(colorMapper(appBG[0]), colorMapper(appBG[1]), colorMapper(appBG[2]), 1);
    }, [theme]);

    useEffect(() => {
        if (canvas && gl) initEngine(canvas, gl, theme);
    }, [canvas, gl]);

    const context: Ctx = {
        canvas,
        gl,
        selectedEntity,
        setCanvas,
        setGL,
        setSelectedEntity,
    };

    return <EngineContext.Provider value={context}>{children}</EngineContext.Provider>;
};

export const useEngine = () => useContext(EngineContext);
