import React from 'react';
import { Box } from '../../components/box';

type Props = {
    children: React.ReactNode;
};

const gridTemplateAreas = `
    'canvas ui'
`;

export const Layout = ({ children }: Props) => {
    return (
        <Box display="grid" gridTemplateAreas={gridTemplateAreas} gridTemplateColumns="auto 300px" w="100vw" h="100vh">
            {children}
        </Box>
    );
};
