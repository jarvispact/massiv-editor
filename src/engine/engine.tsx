import { Entity } from 'massiv-3d';
import React, { useContext, useState } from 'react';

type Ctx = {
    canvas: HTMLCanvasElement;
    gl: WebGL2RenderingContext;
    setCanvas: (canvas: HTMLCanvasElement) => void;
    setGL: (gl: WebGL2RenderingContext) => void;
    selectedEntity: Entity | null;
    setSelectedEntity: (entity: Entity) => void;
};

export const EngineContext = React.createContext<Ctx>({
    canvas: (null as any) as HTMLCanvasElement,
    gl: (null as any) as WebGL2RenderingContext,
    setCanvas: () => {},
    setGL: () => {},
    selectedEntity: null,
    setSelectedEntity: () => {},
});

type Props = {
    children: React.ReactNode;
};

export const EngineProvider = ({ children }: Props) => {
    const [canvas, setCanvas] = useState<HTMLCanvasElement>((null as any) as HTMLCanvasElement);
    const [gl, setGL] = useState<WebGL2RenderingContext>((null as any) as WebGL2RenderingContext);
    const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);

    const context = {
        canvas,
        gl,
        setCanvas: (canvas: HTMLCanvasElement) => setCanvas(canvas),
        setGL: (gl: WebGL2RenderingContext) => setGL(gl),
        selectedEntity,
        setSelectedEntity: (entity: Entity) => setSelectedEntity(entity),
    };

    return <EngineContext.Provider value={context}>{children}</EngineContext.Provider>;
};

export const useEngine = () => useContext(EngineContext);
