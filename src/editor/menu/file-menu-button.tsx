import React from 'react';
import { Dropdown } from '../../components/drop-down';
import { MenuIcon } from '../../components/menu-icon';
import { MenuButton } from './menu-button';
import { MenuListItem } from './menu-list-item';
import { UploadIcon } from '../../components/upload-icon';
import { Text } from '../../components/text';
import { DownloadIcon } from '../../components/download-icon';
import { getDropdownProps } from './get-drop-down-props';

export const FileMenuButton = () => {
    return (
        <Dropdown
            dropdownProps={getDropdownProps('200px')}
            renderTrigger={({ ref, setOpen }) => (
                <MenuButton ref={ref} icon={<MenuIcon pr="m" />} onClick={() => setOpen((prev) => !prev)}>
                    File
                </MenuButton>
            )}
        >
            {({ setOpen }) => (
                <>
                    <MenuListItem
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        <UploadIcon flex="0 0 40px" color="primary500" />
                        <Text flex="1 1 auto" position="relative" top="-1px">
                            Upload World
                        </Text>
                    </MenuListItem>
                    <MenuListItem
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        <DownloadIcon flex="0 0 40px" color="primary500" />
                        <Text flex="1 1 auto" position="relative" top="-1px">
                            Download World
                        </Text>
                    </MenuListItem>
                </>
            )}
        </Dropdown>
    );
};
