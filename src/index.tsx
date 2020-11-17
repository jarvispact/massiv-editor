import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, GlobalStyle, Box } from './design-system';
import { themes } from './themes';

const mobile = `
'canvas'
`;

const normal = `
'canvas property'
`;

const App = () => {
    return (
        <ThemeProvider themes={themes} theme="light">
            <GlobalStyle />
            <Box
                display="grid"
                gridTemplateAreas={[mobile, mobile, normal]}
                gridTemplateRows="1fr"
                gridTemplateColumns={['1fr', '1fr', 'auto 250px', 'auto 300px']}
                w="100vw"
                h="100vh"
            >
                <Box gridArea="canvas" bg="gray600">
                    canvas
                </Box>
                <Box gridArea="property" bg="gray900" display={['none', 'none', 'block']}>
                    property
                </Box>
            </Box>
        </ThemeProvider>
    );
};

ReactDOM.render(<App />, document.getElementById('app'));
