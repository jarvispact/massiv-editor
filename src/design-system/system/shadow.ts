import { Theme } from '../theme/default-theme';
import { CssPropertyConfig } from '../utils/build-css';
import { ResponsiveThemeProp } from '../utils/types';

export type ShadowProps<T extends Theme> = {
    boxShadow?: ResponsiveThemeProp<T, 'boxShadow'>;
    textShadow?: ResponsiveThemeProp<T, 'textShadow'>;
};

export const shadowConfig: CssPropertyConfig[] = [
    {
        cssProperty: 'box-shadow',
        componentProps: ['boxShadow'],
        themeScope: 'boxShadow',
    },
    {
        cssProperty: 'text-shadow',
        componentProps: ['textShadow'],
        themeScope: 'textShadow',
    },
];
