import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, GlobalStyle } from 'massiv-design-system';
import { Canvas } from './editor/canvas/canvas';
import { Layout } from './editor/layout/layout';
import { EngineProvider } from './engine/engine-provider';
import { themes } from './themes';
import { UI } from './editor/ui/ui';
import { World } from 'massiv-3d';

const App = () => {
    return (
        <ThemeProvider themes={themes} theme="dark">
            <GlobalStyle />
            <EngineProvider world={new World()}>
                <Layout>
                    <Canvas />
                    <UI />
                </Layout>
            </EngineProvider>
        </ThemeProvider>
    );
};

ReactDOM.render(<App />, document.getElementById('app'));
