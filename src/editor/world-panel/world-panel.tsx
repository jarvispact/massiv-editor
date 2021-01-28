import { Nullable } from 'massiv-3d';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { Box } from '../../components/box';
import { Heading } from '../../components/heading';
import { Text } from '../../components/text';

type Props = {
    entities: Array<string>;
    selectedEntity: Nullable<string>;
    setSelectedEntity: (entityName: string) => void;
};

export const WorldPanel = React.memo(({ entities, selectedEntity, setSelectedEntity }: Props) => {
    console.log('world-panel rerender');
    const [headingHeight, setHeadingHeight] = useState<Nullable<number>>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);

    useLayoutEffect(() => {
        if (headingRef && headingRef.current) {
            setHeadingHeight(headingRef.current.clientHeight);
        }
    }, []);

    return (
        <Box
            gridArea="world-panel"
            bg="appBackground500"
            height="100%"
            overflow="hidden"
            bbs="solid"
            bbc="appBackground900"
            bbw="1px"
            bls="solid"
            blc="appBackground900"
            blw="1px"
        >
            <Heading ref={headingRef} p="m" bg="appBackground900">{`World (${entities.length} Entities)`}</Heading>
            <Box as="ul" p="m" overflowY="auto" height={headingHeight === null ? '100%' : `calc(100% - ${headingHeight}px)`}>
                {entities.length
                    ? entities.map((entity) => (
                          <Box key={entity} as="li" onClick={() => setSelectedEntity(entity)} pb="s">
                              <Text fontWeight={entity === selectedEntity ? '2xl' : 'm'}>{entity}</Text>
                          </Box>
                      ))
                    : null}
            </Box>
        </Box>
    );
});

WorldPanel.displayName = 'WorldPanel';
