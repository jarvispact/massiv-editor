import React, { useEffect, useState } from 'react';
import { Box } from '../components/box';
import { PanelInput } from '../components/panel-input';
import { PanelLabel } from '../components/panel-label';
import { Transform } from '../../engine/components/transform';

type Props = {
    transform: Transform;
};

export const Quaternion = ({ transform }: Props) => {
    const [x, setX] = useState(transform.data.quaternion[0].toString());
    const [y, setY] = useState(transform.data.quaternion[1].toString());
    const [z, setZ] = useState(transform.data.quaternion[2].toString());
    const [w, setW] = useState(transform.data.quaternion[3].toString());

    useEffect(() => {
        setX(transform.data.quaternion[0].toString());
        setY(transform.data.quaternion[1].toString());
        setZ(transform.data.quaternion[2].toString());
        setW(transform.data.quaternion[3].toString());
    }, [transform.data.quaternion]);

    return (
        <>
            <PanelLabel>Quaternion</PanelLabel>
            <Box display="flex" justifyContent="space-between" pb="m">
                <PanelInput
                    maxW="22%"
                    value={x}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const number = parseFloat(e.target.value);
                        setX(e.target.value);
                        if (!Number.isNaN(number)) {
                            Transform.setQuaternionX(transform, number);
                        }
                    }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                        const number = parseFloat(e.target.value);
                        if (Number.isNaN(number)) {
                            setX('0');
                            Transform.setQuaternionX(transform, 0);
                        }
                    }}
                />
                <PanelInput
                    maxW="22%"
                    value={y}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const number = parseFloat(e.target.value);
                        setY(e.target.value);
                        if (!Number.isNaN(number)) {
                            Transform.setQuaternionY(transform, number);
                        }
                    }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                        const number = parseFloat(e.target.value);
                        if (Number.isNaN(number)) {
                            setY('0');
                            Transform.setQuaternionY(transform, 0);
                        }
                    }}
                />
                <PanelInput
                    maxW="22%"
                    value={z}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const number = parseFloat(e.target.value);
                        setZ(e.target.value);
                        if (!Number.isNaN(number)) {
                            Transform.setQuaternionZ(transform, number);
                        }
                    }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                        const number = parseFloat(e.target.value);
                        if (Number.isNaN(number)) {
                            setZ('0');
                            Transform.setQuaternionZ(transform, 0);
                        }
                    }}
                />
                <PanelInput
                    maxW="22%"
                    value={w}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const number = parseFloat(e.target.value);
                        setW(e.target.value);
                        if (!Number.isNaN(number)) {
                            Transform.setQuaternionW(transform, number);
                        }
                    }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                        const number = parseFloat(e.target.value);
                        if (Number.isNaN(number)) {
                            setW('0');
                            Transform.setQuaternionW(transform, 0);
                        }
                    }}
                />
            </Box>
        </>
    );
};
