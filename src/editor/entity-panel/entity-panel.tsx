import React from 'react';
import { Box } from '../../components/box';
import { useEngine } from '../../engine/engine-provider';

export const EntityPanel = () => {
    console.log('entity-panel rerender');
    const { selectedEntity } = useEngine();

    return (
        <Box gridArea="entity-panel" width="100%" height="100%" bg="success100">
            {selectedEntity === null ? 'No Entity selected' : selectedEntity}
        </Box>
    );
};
