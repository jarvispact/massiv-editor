import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, GlobalStyle } from 'massiv-design-system';
import { Canvas } from './editor/canvas/canvas';
import { Layout } from './editor/layout/layout';
import { EngineProvider } from './engine/engine-provider';
import { themes } from './themes';
import { MenuContainer } from './editor/menu/menu-container';
import { WorldPanel } from './editor/world-panel/world-panel';
import { EntityPanel } from './editor/entity-panel/entity-panel';

const App = () => {
    return (
        <ThemeProvider themes={themes} theme="dark">
            <GlobalStyle />
            <EngineProvider>
                <Layout>
                    <MenuContainer />
                    <Canvas />
                    <WorldPanel />
                    <EntityPanel />
                </Layout>
            </EngineProvider>
        </ThemeProvider>
    );
};

ReactDOM.render(<App />, document.getElementById('app'));
