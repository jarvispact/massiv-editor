import React from 'react';
import { Transform as T } from 'massiv-3d';
import { Box } from '../components/box';
import { useEngine } from '../../engine/engine';
import { Transform } from './transform';
import { PanelLabel } from '../components/panel-label';

export const EntityPanel = () => {
    const { selectedEntity } = useEngine();
    const transform = selectedEntity ? (selectedEntity.getComponentByClass(T) as T) : null;

    return (
        <Box gridArea="entity-panel" bg="appBackground" bls="solid" blc="panelBorder" blw="1px" bts="solid" btc="panelBorder" btw="1px" p="m">
            {selectedEntity ? transform && <Transform transform={transform} /> : <PanelLabel>No Entity selected</PanelLabel>}
        </Box>
    );
};
