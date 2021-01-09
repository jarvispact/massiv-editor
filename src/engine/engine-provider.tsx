import React, { useContext, useState } from 'react';

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

export const EngineProvider = ({ children }: Props) => {
    const [canvas, setCanvas] = useState<HTMLCanvasElement>((null as any) as HTMLCanvasElement);
    const [gl, setGL] = useState<WebGL2RenderingContext>((null as any) as WebGL2RenderingContext);

    const context: Ctx = {
        canvas,
        gl,
        setCanvas,
        setGL,
    };

    return <EngineContext.Provider value={context}>{children}</EngineContext.Provider>;
};

export const useEngine = () => useContext(EngineContext);
