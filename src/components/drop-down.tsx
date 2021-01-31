import { Nullable } from 'massiv-3d';
import { BoxProps } from 'massiv-design-system';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { useClickOutside } from '../hooks/use-click-outside';
import { Theme } from '../themes';
import { Box } from './box';

type RenderTriggerProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    ref: React.RefObject<HTMLDivElement>;
};

type RenderDropdownProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type Props = {
    renderTrigger: (props: RenderTriggerProps) => React.ReactNode;
    dropdownProps?: BoxProps<Theme>;
    children: (props: RenderDropdownProps) => React.ReactNode;
};

export const Dropdown = ({ renderTrigger, dropdownProps, children }: Props) => {
    const [open, setOpen] = useState(false);
    const [triggerRect, setTriggerRect] = useState<Nullable<DOMRect>>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    useClickOutside([triggerRef, dropdownRef], () => setOpen(false));

    useLayoutEffect(() => {
        if (triggerRef && triggerRef.current) {
            setTriggerRect(triggerRef.current.getBoundingClientRect());
        }
    }, [triggerRef]);

    return (
        <Box position="relative">
            {renderTrigger({ open, setOpen, ref: triggerRef })}
            <Box
                ref={dropdownRef}
                position="absolute"
                display={open ? 'block' : 'none'}
                top={triggerRect ? `${triggerRect.bottom + 1}px` : undefined}
                left="0px"
                width={triggerRect ? `${triggerRect.width}px` : undefined}
                {...dropdownProps}
            >
                {children({ open, setOpen })}
            </Box>
        </Box>
    );
};
