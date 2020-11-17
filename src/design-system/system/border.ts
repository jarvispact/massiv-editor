import { Theme } from '../theme/default-theme';
import { CssPropertyConfig } from '../utils/build-css';
import { ResponsiveThemeProp, ResponsiveProp } from '../utils/types';

export type BorderProps<T extends Theme> = {
    borderStyle?: ResponsiveProp;
    bs?: ResponsiveProp;
    borderWidth?: ResponsiveThemeProp<T, 'width'>;
    bw?: ResponsiveThemeProp<T, 'width'>;
    borderColor?: ResponsiveThemeProp<T, 'color'>;
    bc?: ResponsiveThemeProp<T, 'color'>;
    borderRadius?: ResponsiveThemeProp<T, 'radii'>;
    br?: ResponsiveThemeProp<T, 'radii'>;

    borderTopStyle?: ResponsiveProp;
    bts?: ResponsiveProp;
    borderTopWidth?: ResponsiveThemeProp<T, 'width'>;
    btw?: ResponsiveThemeProp<T, 'width'>;
    borderTopColor?: ResponsiveThemeProp<T, 'color'>;
    btc?: ResponsiveThemeProp<T, 'color'>;

    borderBottomStyle?: ResponsiveProp;
    bbs?: ResponsiveProp;
    borderBottomWidth?: ResponsiveThemeProp<T, 'width'>;
    bbw?: ResponsiveThemeProp<T, 'width'>;
    borderBottomColor?: ResponsiveThemeProp<T, 'color'>;
    bbc?: ResponsiveThemeProp<T, 'color'>;

    borderLeftStyle?: ResponsiveProp;
    bls?: ResponsiveProp;
    borderLeftWidth?: ResponsiveThemeProp<T, 'width'>;
    blw?: ResponsiveThemeProp<T, 'width'>;
    borderLeftColor?: ResponsiveThemeProp<T, 'color'>;
    blc?: ResponsiveThemeProp<T, 'color'>;

    borderRightStyle?: ResponsiveProp;
    brs?: ResponsiveProp;
    borderRightWidth?: ResponsiveThemeProp<T, 'width'>;
    brw?: ResponsiveThemeProp<T, 'width'>;
    borderRightColor?: ResponsiveThemeProp<T, 'color'>;
    brc?: ResponsiveThemeProp<T, 'color'>;

    borderTopLeftRadius?: ResponsiveThemeProp<T, 'radii'>;
    btlr?: ResponsiveThemeProp<T, 'radii'>;
    borderTopRightRadius?: ResponsiveThemeProp<T, 'radii'>;
    btrr?: ResponsiveThemeProp<T, 'radii'>;
    borderBottomLeftRadius?: ResponsiveThemeProp<T, 'radii'>;
    bblr?: ResponsiveThemeProp<T, 'radii'>;
    borderBottomRghtRadius?: ResponsiveThemeProp<T, 'radii'>;
    bbrr?: ResponsiveThemeProp<T, 'radii'>;
};

export const borderConfig: CssPropertyConfig[] = [
    {
        cssProperty: 'border-style',
        componentProps: ['borderStyle', 'bs'],
        themeScope: null,
    },
    {
        cssProperty: 'border-width',
        componentProps: ['borderWidth', 'bw'],
        themeScope: 'width',
    },
    {
        cssProperty: 'border-color',
        componentProps: ['borderColor', 'bc'],
        themeScope: 'color',
    },
    {
        cssProperty: 'border-radius',
        componentProps: ['borderRadius', 'br'],
        themeScope: 'radii',
    },

    {
        cssProperty: 'border-top-style',
        componentProps: ['borderTopStyle', 'bts'],
        themeScope: null,
    },
    {
        cssProperty: 'border-top-width',
        componentProps: ['borderTopWidth', 'btw'],
        themeScope: 'width',
    },
    {
        cssProperty: 'border-top-color',
        componentProps: ['borderTopColor', 'btc'],
        themeScope: 'color',
    },

    {
        cssProperty: 'border-bottom-style',
        componentProps: ['borderBottomStyle', 'bbs'],
        themeScope: null,
    },
    {
        cssProperty: 'border-bottom-width',
        componentProps: ['borderBottomWidth', 'bbw'],
        themeScope: 'width',
    },
    {
        cssProperty: 'border-bottom-color',
        componentProps: ['borderBottomColor', 'bbc'],
        themeScope: 'color',
    },

    {
        cssProperty: 'border-left-style',
        componentProps: ['borderLeftStyle', 'bls'],
        themeScope: null,
    },
    {
        cssProperty: 'border-left-width',
        componentProps: ['borderLeftWidth', 'blw'],
        themeScope: 'width',
    },
    {
        cssProperty: 'border-left-color',
        componentProps: ['borderLeftColor', 'blc'],
        themeScope: 'color',
    },

    {
        cssProperty: 'border-right-style',
        componentProps: ['borderRightStyle', 'brs'],
        themeScope: null,
    },
    {
        cssProperty: 'border-right-width',
        componentProps: ['borderRightWidth', 'brw'],
        themeScope: 'width',
    },
    {
        cssProperty: 'border-right-color',
        componentProps: ['borderRightColor', 'brc'],
        themeScope: 'color',
    },

    {
        cssProperty: 'border-top-left-radius',
        componentProps: ['borderTopLeftRadius', 'btlr'],
        themeScope: 'radii',
    },
    {
        cssProperty: 'border-top-right-radius',
        componentProps: ['borderTopRightRadius', 'btrr'],
        themeScope: 'radii',
    },
    {
        cssProperty: 'border-bottom-left-radius',
        componentProps: ['borderBottomLeftRadius', 'bblr'],
        themeScope: 'radii',
    },
    {
        cssProperty: 'border-bottom-right-radius',
        componentProps: ['borderBottomRightRadius', 'bbrr'],
        themeScope: 'radii',
    },
];
