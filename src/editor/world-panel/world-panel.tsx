import React from 'react';
import { Box } from '../components/box';
import { PanelHeading } from '../components/panel-heading';
import { WorldActions } from './world-actions';
import { EntityList } from './entity-list';

export const WorldPanel = () => {
    return (
        <Box gridArea="world-panel" bg="appBackground" bls="solid" blc="panelBorder" blw="1px" p="m">
            <PanelHeading>World Actions</PanelHeading>
            <WorldActions />
            <Box bbs="solid" bbc="panelBorder" bbw="1px" mt="l" mb="l" />
            <PanelHeading>Entity List</PanelHeading>
            <EntityList />
        </Box>
    );
};
