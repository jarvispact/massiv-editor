import { Transform } from 'massiv-3d';
import React, { useEffect, useState } from 'react';
import { Box } from '../components/box';
import { PanelInput } from '../components/panel-input';
import { PanelLabel } from '../components/panel-label';

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
                            transform.setQuaternionX(number);
                        }
                    }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                        const number = parseFloat(e.target.value);
                        if (Number.isNaN(number)) {
                            setX('0');
                            transform.setQuaternionX(0);
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
                            transform.setQuaternionY(number);
                        }
                    }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                        const number = parseFloat(e.target.value);
                        if (Number.isNaN(number)) {
                            setY('0');
                            transform.setQuaternionY(0);
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
                            transform.setQuaternionZ(number);
                        }
                    }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                        const number = parseFloat(e.target.value);
                        if (Number.isNaN(number)) {
                            setZ('0');
                            transform.setQuaternionZ(0);
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
                            transform.setQuaternionW(number);
                        }
                    }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                        const number = parseFloat(e.target.value);
                        if (Number.isNaN(number)) {
                            setW('0');
                            transform.setQuaternionW(1);
                        }
                    }}
                />
            </Box>
        </>
    );
};
