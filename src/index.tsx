import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, GlobalStyle } from './design-system';
import { Canvas } from './editor/canvas/canvas';
import { EntityPanel } from './editor/entity-panel/entity-panel';
import { Layout } from './editor/layout/layout';
import { WorldPanel } from './editor/world-panel/world-panel';
import { EngineProvider } from './engine/engine';
import { themes } from './themes';

const App = () => {
    return (
        <ThemeProvider themes={themes} theme="light">
            <GlobalStyle />
            <EngineProvider>
                <Layout>
                    <Canvas />
                    <WorldPanel />
                    <EntityPanel />
                </Layout>
            </EngineProvider>
        </ThemeProvider>
    );
};

ReactDOM.render(<App />, document.getElementById('app'));
