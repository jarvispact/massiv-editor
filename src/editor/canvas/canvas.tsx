import { getWebgl2Context } from 'massiv-3d';
import React, { useLayoutEffect, useRef } from 'react';
import { Box } from '../../components/box';
import { useEngine } from '../../engine/engine-provider';

export const Canvas = () => {
    const ref = useRef<HTMLCanvasElement>(null);
    const { setCanvas, setGL } = useEngine();

    useLayoutEffect(() => {
        if (ref && ref.current) {
            ref.current.width = ref.current.clientWidth;
            ref.current.height = ref.current.clientHeight;
            setCanvas(ref.current);
            setGL(getWebgl2Context(ref.current));
        }
    }, []);

    return <Box gridArea="canvas" ref={ref} as="canvas" id="canvas" width="100%" height="100%" bg="appBackground500" style={{ outline: 'none' }} />;
};
