import { Nullable } from 'massiv-3d';
import React from 'react';
import { Box } from '../../components/box';
import { Heading } from '../../components/heading';
import { Input } from '../../components/input';
import { Label } from '../../components/label';

type Props = {
    selectedEntity: Nullable<string>;
};

export const EntityPanel = ({ selectedEntity }: Props) => {
    console.log('entity-panel rerender');

    return (
        <Box gridArea="entity-panel" bg="editorBackground">
            <Heading p="m" bg="editorHeadingBackground">
                {selectedEntity === null ? 'No Entity selected' : `Entity: ${selectedEntity}`}
            </Heading>
            <Box as="ul">
                <Box p="s">
                    <Heading>Transform</Heading>
                    <Box display="flex" justifyContent="space-between" p="s">
                        <Box width="30%">
                            <Label htmlFor="x">X</Label>
                            <Input name="x" value="1" onChange={(e) => console.log({ name: e.currentTarget.name, value: e.currentTarget.value })} />
                        </Box>
                        <Box width="30%">
                            <Label htmlFor="y">Y</Label>
                            <Input name="y" value="1" onChange={(e) => console.log({ name: e.currentTarget.name, value: e.currentTarget.value })} />
                        </Box>
                        <Box width="30%">
                            <Label htmlFor="z">Z</Label>
                            <Input name="z" value="1" onChange={(e) => console.log({ name: e.currentTarget.name, value: e.currentTarget.value })} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
