import { Transform as T } from 'massiv-3d';
import React from 'react';
import { PanelHeading } from '../components/panel-heading';
import { Quaternion } from './quaternion';
import { Scaling } from './scaling';
import { Translation } from './translation';

type Props = {
    transform: T;
};

export const Transform = ({ transform }: Props) => {
    return (
        <>
            <PanelHeading>Transform</PanelHeading>
            <Translation transform={transform} />
            <Scaling transform={transform} />
            <Quaternion transform={transform} />
        </>
    );
};
