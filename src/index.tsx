import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, GlobalStyle } from 'massiv-design-system';
import { Canvas } from './editor/canvas/canvas';
import { Layout } from './editor/layout/layout';
import { EngineProvider } from './engine/engine-provider';
import { themes } from './themes';
import { MenuContainer } from './editor/menu/menu-container';
import { EntityPanelContainer } from './editor/entity-panel/entity-panel-container';
import { WorldPanelContainer } from './editor/world-panel/world-panel-container';

const App = () => {
    return (
        <ThemeProvider themes={themes} theme="orangeDark">
            <GlobalStyle />
            <EngineProvider>
                <Layout>
                    <MenuContainer />
                    <Canvas />
                    <WorldPanelContainer />
                    <EntityPanelContainer />
                </Layout>
            </EngineProvider>
        </ThemeProvider>
    );
};

ReactDOM.render(<App />, document.getElementById('app'));
