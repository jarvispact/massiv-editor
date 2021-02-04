import { BoxProps, styled } from 'massiv-design-system';
import React from 'react';
import { Box } from '../../components/box';
import { CameraIcon } from '../../components/camera-icon';
import { CogIcon } from '../../components/cog-item';
import { CubeIcon } from '../../components/cube-icon';
import { DownloadIcon } from '../../components/download-icon';
import { Dropdown } from '../../components/drop-down';
import { LightIcon } from '../../components/light-icon';
import { MenuButton } from '../../components/menu-button';
import { MenuIcon } from '../../components/menu-icon';
import { Text } from '../../components/text';
import { UploadIcon } from '../../components/upload-icon';
import { WorldIcon } from '../../components/world-icon';
import { Theme, ThemeKey } from '../../themes';
import { GeometryType } from './types';

type Props = {
    onAddEntity: (type: GeometryType) => Promise<void>;
    onThemeChange: (theme: ThemeKey) => void;
};

const dropdownProps = (width: string) => ({ bg: 'menuDropdownBackground', width, br: 's', boxShadow: 'menuDropdown', as: 'ul' as React.ElementType });

const FileMenuButton = () => {
    return (
        <Dropdown
            dropdownProps={dropdownProps('200px')}
            renderTrigger={({ ref, setOpen }) => (
                <MenuButton ref={ref} icon={<MenuIcon pr="m" />} onClick={() => setOpen((prev) => !prev)}>
                    File
                </MenuButton>
            )}
        >
            {({ setOpen }) => (
                <>
                    <HoverBox
                        as="li"
                        display="flex"
                        alignItems="center"
                        p="m"
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        <UploadIcon flex="0 0 40px" color="primary500" />
                        <Text flex="1 1 auto" position="relative" top="-1px">
                            Upload World
                        </Text>
                    </HoverBox>
                    <HoverBox
                        as="li"
                        display="flex"
                        alignItems="center"
                        p="m"
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        <DownloadIcon flex="0 0 40px" color="primary500" />
                        <Text flex="1 1 auto" position="relative" top="-1px">
                            Download World
                        </Text>
                    </HoverBox>
                </>
            )}
        </Dropdown>
    );
};

const HoverBox: React.FC<BoxProps<Theme>> = styled(Box)<{ theme: Theme }>`
    cursor: pointer;
    &:hover {
        background-color: ${(props) => props.theme.color.menuDropdownHoverBackground};
    }
`;

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

const WorldMenuButton = ({ onAddEntity }: { onAddEntity: Props['onAddEntity'] }) => {
    return (
        <Dropdown
            dropdownProps={dropdownProps('300px')}
            renderTrigger={({ ref, setOpen }) => (
                <MenuButton ref={ref} icon={<WorldIcon pr="m" />} onClick={() => setOpen((prev) => !prev)}>
                    World
                </MenuButton>
            )}
        >
            {({ setOpen }) => (
                <>
                    {geometryItems.map((item, idx) => (
                        <HoverBox
                            key={item.label}
                            as="li"
                            display="flex"
                            alignItems="center"
                            p="m"
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
                        </HoverBox>
                    ))}
                    {lightItems.map((item, idx) => (
                        <HoverBox
                            key={item.label}
                            as="li"
                            display="flex"
                            alignItems="center"
                            p="m"
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
                        </HoverBox>
                    ))}
                    {cameraItems.map((item) => (
                        <HoverBox
                            key={item.label}
                            as="li"
                            display="flex"
                            alignItems="center"
                            p="m"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <CameraIcon flex="0 0 40px" color="primary500" />
                            <Text flex="1 1 auto" position="relative" top="-1px">
                                {item.label}
                            </Text>
                        </HoverBox>
                    ))}
                </>
            )}
        </Dropdown>
    );
};

type ThemeItem = {
    label: string;
    themeKey: ThemeKey;
};

const themeItems: Array<ThemeItem> = [
    { label: 'Orange Light Theme', themeKey: 'orangeLight' },
    { label: 'Orange Dark Theme', themeKey: 'orangeDark' },
    { label: 'Blue Light Theme', themeKey: 'blueLight' },
    { label: 'Blue Dark Theme', themeKey: 'blueDark' },
];

const SettingsMenuButton = ({ onThemeChange }: { onThemeChange: Props['onThemeChange'] }) => {
    return (
        <Dropdown
            dropdownProps={dropdownProps('250px')}
            renderTrigger={({ ref, setOpen }) => (
                <MenuButton ref={ref} icon={<CogIcon pr="m" />} onClick={() => setOpen((prev) => !prev)}>
                    Settings
                </MenuButton>
            )}
        >
            {({ setOpen }) => (
                <>
                    {themeItems.map((item) => (
                        <HoverBox
                            key={item.label}
                            as="li"
                            display="flex"
                            alignItems="center"
                            p="m"
                            onClick={() => {
                                onThemeChange(item.themeKey);
                                setOpen(false);
                            }}
                        >
                            <CogIcon flex="0 0 40px" color="primary500" />
                            <Text flex="1 1 auto" position="relative" top="-1px">
                                {item.label}
                            </Text>
                        </HoverBox>
                    ))}
                </>
            )}
        </Dropdown>
    );
};

export const Menu = React.memo(({ onAddEntity, onThemeChange }: Props) => {
    console.log('menu rerender');
    return (
        <Box gridArea="menu" bg="menuBackground" display="flex" alignItems="center">
            <Box ml="xl">
                <FileMenuButton />
            </Box>
            <Box ml="xl">
                <WorldMenuButton onAddEntity={onAddEntity} />
            </Box>
            <Box ml="xl">
                <SettingsMenuButton onThemeChange={onThemeChange} />
            </Box>
        </Box>
    );
});

Menu.displayName = 'Menu';
