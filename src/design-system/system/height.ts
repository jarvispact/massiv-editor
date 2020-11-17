import { Theme } from '../theme/default-theme';
import { CssPropertyConfig } from '../utils/build-css';
import { ResponsiveThemeProp } from '../utils/types';

export type HeightProps<T extends Theme> = {
    height?: ResponsiveThemeProp<T, 'height'>;
    h?: ResponsiveThemeProp<T, 'height'>;
    minHeight?: ResponsiveThemeProp<T, 'height'>;
    minH?: ResponsiveThemeProp<T, 'height'>;
    maxHeight?: ResponsiveThemeProp<T, 'height'>;
    maxH?: ResponsiveThemeProp<T, 'height'>;
};

export const heightConfig: CssPropertyConfig[] = [
    {
        cssProperty: 'height',
        componentProps: ['height', 'h'],
        themeScope: 'height',
    },
    {
        cssProperty: 'min-height',
        componentProps: ['minHeight', 'minH'],
        themeScope: 'height',
    },
    {
        cssProperty: 'max-height',
        componentProps: ['maxHeight', 'maxH'],
        themeScope: 'height',
    },
];
