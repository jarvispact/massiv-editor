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
        <Box gridArea="entity-panel" bg="appBackground500" bls="solid" blc="appBackground900" blw="1px">
            <Heading bg="appBackground900" p="m">
                {selectedEntity === null ? 'No Entity selected' : `Entity: ${selectedEntity}`}
            </Heading>
            <Box as="ul">
                <Box p="s">
                    <Heading>Transform</Heading>
                    <Box display="flex" justifyContent="space-between">
                        <Box width="30%">
                            <Label htmlFor="x">X</Label>
                            <Input name="x" value="" onChange={(e) => console.log({ name: e.currentTarget.name, value: e.currentTarget.value })} />
                        </Box>
                        <Box width="30%">
                            <Label htmlFor="y">Y</Label>
                            <Input name="y" value="" onChange={(e) => console.log({ name: e.currentTarget.name, value: e.currentTarget.value })} />
                        </Box>
                        <Box width="30%">
                            <Label htmlFor="z">Z</Label>
                            <Input name="z" value="" onChange={(e) => console.log({ name: e.currentTarget.name, value: e.currentTarget.value })} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
