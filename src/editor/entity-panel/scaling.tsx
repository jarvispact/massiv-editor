import { Transform } from 'massiv-3d';
import React, { useEffect, useState } from 'react';
import { Box } from '../components/box';
import { PanelInput } from '../components/panel-input';
import { PanelLabel } from '../components/panel-label';

type Props = {
    transform: Transform;
};

export const Scaling = ({ transform }: Props) => {
    const [x, setX] = useState(transform.data.scaling[0].toString());
    const [y, setY] = useState(transform.data.scaling[1].toString());
    const [z, setZ] = useState(transform.data.scaling[2].toString());

    useEffect(() => {
        setX(transform.data.scaling[0].toString());
        setY(transform.data.scaling[1].toString());
        setZ(transform.data.scaling[2].toString());
    }, [transform.data.scaling]);

    return (
        <>
            <PanelLabel>Scaling</PanelLabel>
            <Box display="flex" justifyContent="space-between" pb="m">
                <PanelInput
                    maxW="30%"
                    value={x}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const number = parseFloat(e.target.value);
                        setX(e.target.value);
                        if (!Number.isNaN(number)) {
                            transform.setScaleX(number);
                        }
                    }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                        const number = parseFloat(e.target.value);
                        if (Number.isNaN(number)) {
                            setX('0');
                            transform.setScaleX(0);
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
                            transform.setScaleY(number);
                        }
                    }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                        const number = parseFloat(e.target.value);
                        if (Number.isNaN(number)) {
                            setY('0');
                            transform.setScaleY(0);
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
                            transform.setScaleZ(number);
                        }
                    }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                        const number = parseFloat(e.target.value);
                        if (Number.isNaN(number)) {
                            setZ('0');
                            transform.setScaleZ(0);
                        }
                    }}
                />
            </Box>
        </>
    );
};
