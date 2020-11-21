import React, { useEffect, useState } from 'react';
import { Box } from '../components/box';
import { PanelInput } from '../components/panel-input';
import { PanelLabel } from '../components/panel-label';
import { Transform } from '../../engine/components/transform';

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
                            Transform.setScalingX(transform, number);
                        }
                    }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                        const number = parseFloat(e.target.value);
                        if (Number.isNaN(number)) {
                            setX('0');
                            Transform.setScalingX(transform, 0);
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
                            Transform.setScalingY(transform, number);
                        }
                    }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                        const number = parseFloat(e.target.value);
                        if (Number.isNaN(number)) {
                            setY('0');
                            Transform.setScalingY(transform, 0);
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
                            Transform.setScalingZ(transform, number);
                        }
                    }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                        const number = parseFloat(e.target.value);
                        if (Number.isNaN(number)) {
                            setZ('0');
                            Transform.setScalingZ(transform, 0);
                        }
                    }}
                />
            </Box>
        </>
    );
};
