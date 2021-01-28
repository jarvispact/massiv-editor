import React, { useEffect, useState } from 'react';
import { useEngine } from '../../engine/engine-provider';
import { world } from '../../world';
import { WorldPanel } from './world-panel';

export const WorldPanelContainer = () => {
    console.log('world-panel-container rerender');
    const [entities, setEntities] = useState<Array<string>>([]);
    const { selectedEntity, setSelectedEntity } = useEngine();

    useEffect(() => {
        world.subscribe((action) => {
            if (action.type === 'ADD-ENTITY') {
                setEntities((prev) => [...prev, action.payload]);
            } else if (action.type === 'REMOVE-ENTITY') {
                setEntities((prev) => prev.filter((e) => e !== action.payload));
            }
        });
    }, []);

    return <WorldPanel entities={entities} selectedEntity={selectedEntity} setSelectedEntity={setSelectedEntity} />;
};
