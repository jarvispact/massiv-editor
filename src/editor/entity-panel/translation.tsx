import { Transform } from 'massiv-3d';
import React, { useEffect, useState } from 'react';
import { Box } from '../components/box';
import { PanelInput } from '../components/panel-input';
import { PanelLabel } from '../components/panel-label';

type Props = {
    transform: Transform;
};

export const Translation = ({ transform }: Props) => {
    const [x, setX] = useState(transform.data.translation[0].toString());
    const [y, setY] = useState(transform.data.translation[1].toString());
    const [z, setZ] = useState(transform.data.translation[2].toString());

    useEffect(() => {
        setX(transform.data.translation[0].toString());
        setY(transform.data.translation[1].toString());
        setZ(transform.data.translation[2].toString());
    }, [transform.data.translation]);

    return (
        <>
            <PanelLabel>Translation</PanelLabel>
            <Box display="flex" justifyContent="space-between" pb="m">
                <PanelInput
                    maxW="30%"
                    value={x}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const number = parseFloat(e.target.value);
                        setX(e.target.value);
                        if (!Number.isNaN(number)) {
                            transform.setTranslationX(number);
                        }
                    }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                        const number = parseFloat(e.target.value);
                        if (Number.isNaN(number)) {
                            setX('0');
                            transform.setTranslationX(0);
                        }
                    }}
                />
                <PanelInput
                    maxW="30%"
                    value={y}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const number = parseFloat(e.target.value);
                        setY(e.target.value);
                        if (!Number.isNaN(number)) {
                            transform.setTranslationY(number);
                        }
                    }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                        const number = parseFloat(e.target.value);
                        if (Number.isNaN(number)) {
                            setY('0');
                            transform.setTranslationY(0);
                        }
                    }}
                />
                <PanelInput
                    maxW="30%"
                    value={z}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const number = parseFloat(e.target.value);
                        setZ(e.target.value);
                        if (!Number.isNaN(number)) {
                            transform.setTranslationZ(number);
                        }
                    }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                        const number = parseFloat(e.target.value);
                        if (Number.isNaN(number)) {
                            setZ('0');
                            transform.setTranslationZ(0);
                        }
                    }}
                />
            </Box>
        </>
    );
};
