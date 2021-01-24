import React, { useEffect, useState } from 'react';
import { Box } from '../../components/box';
import { useEngine } from '../../engine/engine-provider';
import { world } from '../../world';

export const WorldPanel = () => {
    console.log('world-panel rerender');
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

    return (
        <Box gridArea="world-panel" width="100%" height="100%" bg="error100" p="l">
            <Box as="ul">
                {entities.length ? (
                    entities.map((name) => (
                        <Box key={name} as="li" color={name === selectedEntity ? 'gray900' : 'gray600'} onClick={() => setSelectedEntity(name)}>
                            {name}
                        </Box>
                    ))
                ) : (
                    <Box>No Entities</Box>
                )}
            </Box>
        </Box>
    );
};
