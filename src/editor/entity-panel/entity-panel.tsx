import React from 'react';
import { Box } from '../components/box';
import { useEngine } from '../../engine/engine';
import { Transform } from './transform';
import { Transform as T } from '../../engine/components/transform';
import { PanelLabel } from '../components/panel-label';

export const EntityPanel = () => {
    const { selectedEntity } = useEngine();
    const transform = selectedEntity ? (selectedEntity.getComponent('Transform') as T) : null;

    return (
        <Box
            gridArea="entity-panel"
            bg="appBackground"
            bls="solid"
            blc="panelBorder"
            blw="1px"
            bts="solid"
            btc="panelBorder"
            btw="1px"
            p="m"
        >
            {selectedEntity ? (
                transform && <Transform transform={transform} />
            ) : (
                <PanelLabel>No Entity selected</PanelLabel>
            )}
        </Box>
    );
};
