import React from 'react';
import { Dropdown } from '../../components/drop-down';
import { MenuButton } from './menu-button';
import { MenuListItem } from './menu-list-item';
import { Text } from '../../components/text';
import { getDropdownProps } from './get-drop-down-props';
import { ThemeKey } from '../../themes';
import { CogIcon } from '../../components/cog-item';

type Props = {
    onThemeChange: (theme: ThemeKey) => void;
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

export const SettingsMenuButton = ({ onThemeChange }: Props) => {
    console.log('settings button re-render');
    return (
        <Dropdown
            dropdownProps={getDropdownProps('250px')}
            renderTrigger={({ ref, setOpen }) => (
                <MenuButton ref={ref} icon={<CogIcon pr="m" />} onClick={() => setOpen((prev) => !prev)}>
                    Settings
                </MenuButton>
            )}
        >
            {({ setOpen }) => (
                <>
                    {themeItems.map((item) => (
                        <MenuListItem
                            key={item.label}
                            onClick={() => {
                                onThemeChange(item.themeKey);
                                setOpen(false);
                            }}
                        >
                            <CogIcon flex="0 0 40px" color="primary500" />
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
