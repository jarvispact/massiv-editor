import { getWebgl2Context } from 'massiv-3d';
import React, { useLayoutEffect, useRef } from 'react';
import { Box } from '../components/box';
import { useEngine } from '../../engine/engine';
import { initializeEngine } from '../../world';

export const Canvas = () => {
    const ref = useRef<HTMLCanvasElement>(null);
    const { setCanvas, setGL } = useEngine();

    useLayoutEffect(() => {
        if (ref && ref.current) {
            ref.current.width = ref.current.clientWidth;
            ref.current.height = ref.current.clientHeight;
            setCanvas(ref.current);
            const gl = getWebgl2Context(ref.current);
            setGL(gl);
            initializeEngine(ref.current, gl);
        }
    }, []);

    return (
        <Box gridArea="canvas" bg="appBackground">
            <Box ref={ref} as="canvas" id="canvas" width="100%" height="100%" />
        </Box>
    );
};
