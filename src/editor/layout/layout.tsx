import React from 'react';
import { Box } from '../../components/box';

type Props = {
    children: React.ReactNode;
};

const gridTemplateAreas = `
    'menu menu'
    'canvas world-panel'
    'canvas entity-panel'
`;

export const Layout = ({ children }: Props) => {
    return (
        <Box display="grid" gridTemplateAreas={gridTemplateAreas} gridTemplateRows="40px 1fr 2fr" gridTemplateColumns="1fr 300px" w="100vw" h="100vh">
            {children}
        </Box>
    );
};
