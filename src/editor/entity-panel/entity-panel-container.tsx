import React from 'react';
import { useEngine } from '../../engine/engine-provider';
import { EntityPanel } from './entity-panel';

export const EntityPanelContainer = () => {
    console.log('entity-panel container rerender');
    const { selectedEntity } = useEngine();

    return <EntityPanel selectedEntity={selectedEntity} />;
};
