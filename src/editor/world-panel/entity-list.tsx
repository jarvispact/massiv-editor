import { Entity } from 'massiv-3d';
import React, { useEffect, useState } from 'react';
import { Box } from '../components/box';
import { useEngine } from '../../engine/engine';
import { world } from '../../world';

export const EntityList = () => {
    const [entities, setEntities] = useState<Array<Entity>>([]);
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

    return (
        <Box as="ul">
            {entities.map((e) => (
                <Box
                    as="li"
                    color="panelText"
                    fontWeight={selectedEntity === e ? '2xl' : undefined}
                    key={e.name}
                    onClick={() => setSelectedEntity(e)}
                >
                    {e.name}
                </Box>
            ))}
        </Box>
    );
};
