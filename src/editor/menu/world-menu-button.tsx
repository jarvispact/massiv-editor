import React from 'react';
import { Dropdown } from '../../components/drop-down';
import { MenuButton } from './menu-button';
import { MenuListItem } from './menu-list-item';
import { Text } from '../../components/text';
import { getDropdownProps } from './get-drop-down-props';
import { GeometryType } from './types';
import { WorldIcon } from '../../components/world-icon';
import { CubeIcon } from '../../components/cube-icon';
import { LightIcon } from '../../components/light-icon';
import { CameraIcon } from '../../components/camera-icon';

type Props = {
    onAddEntity: (type: GeometryType) => Promise<void>;
};

type GeometryItem = {
    label: string;
    geometryType: GeometryType;
};

const geometryItems: Array<GeometryItem> = [
    { label: 'Add Plane', geometryType: 'plane' },
    { label: 'Add Cube', geometryType: 'cube' },
    { label: 'Add Sphere', geometryType: 'sphere' },
];

type LightItem = {
    label: string;
    lightType: 'directional' | 'point' | 'spot';
};

const lightItems: Array<LightItem> = [
    { label: 'Add Directional Light', lightType: 'directional' },
    { label: 'Add Point Light', lightType: 'point' },
    { label: 'Add Spot Light', lightType: 'spot' },
];

type CameraItem = {
    label: string;
    cameraType: 'perspective' | 'orthographic';
};

const cameraItems: Array<CameraItem> = [
    { label: 'Add Perspective Camera', cameraType: 'perspective' },
    { label: 'Add Orthographic Camera', cameraType: 'orthographic' },
];

export const WorldMenuButton = ({ onAddEntity }: { onAddEntity: Props['onAddEntity'] }) => {
    return (
        <Dropdown
            dropdownProps={getDropdownProps('300px')}
            renderTrigger={({ ref, setOpen }) => (
                <MenuButton ref={ref} icon={<WorldIcon pr="m" />} onClick={() => setOpen((prev) => !prev)}>
                    World
                </MenuButton>
            )}
        >
            {({ setOpen }) => (
                <>
                    {geometryItems.map((item, idx) => (
                        <MenuListItem
                            key={item.label}
                            bbs={idx === geometryItems.length - 1 ? 'solid' : 'none'}
                            bbw="1px"
                            bbc="menuDropdownDividerBackground"
                            onClick={() => {
                                onAddEntity(item.geometryType);
                                setOpen(false);
                            }}
                        >
                            <CubeIcon flex="0 0 40px" color="primary500" />
                            <Text flex="1 1 auto" position="relative" top="-1px">
                                {item.label}
                            </Text>
                        </MenuListItem>
                    ))}
                    {lightItems.map((item, idx) => (
                        <MenuListItem
                            key={item.label}
                            bbs={idx === geometryItems.length - 1 ? 'solid' : 'none'}
                            bbw="1px"
                            bbc="menuDropdownDividerBackground"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <LightIcon flex="0 0 40px" color="primary500" />
                            <Text flex="1 1 auto" position="relative" top="-1px">
                                {item.label}
                            </Text>
                        </MenuListItem>
                    ))}
                    {cameraItems.map((item) => (
                        <MenuListItem
                            key={item.label}
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <CameraIcon flex="0 0 40px" color="primary500" />
                            <Text flex="1 1 auto" position="relative" top="-1px">
                                {item.label}
                            </Text>
                        </MenuListItem>
                    ))}
                </>
            )}
        </Dropdown>
    );
};
