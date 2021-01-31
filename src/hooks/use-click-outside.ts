import React, { useEffect } from 'react';

export const useClickOutside = <T extends HTMLElement>(refs: Array<React.RefObject<T>>, callback: () => void) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (refs.every((ref) => ref.current && !ref.current.contains(event.target))) {
                callback();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, refs);
};
