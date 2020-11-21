import { createCustomTheme, defaultTheme } from './design-system/theme/default-theme';

const light = createCustomTheme({
    ...defaultTheme,
    color: {
        ...defaultTheme.color,
        appBackground: defaultTheme.color.gray200,
        panelBorder: defaultTheme.color.gray600,
        panelText: defaultTheme.color.gray800,
        panelInputBG: '#ffffff',
        panelInputBorder: defaultTheme.color.gray200,
    },
});

const dark = createCustomTheme({
    ...defaultTheme,
    color: {
        ...defaultTheme.color,
        appBackground: defaultTheme.color.gray800,
        panelBorder: defaultTheme.color.gray500,
        panelText: defaultTheme.color.gray200,
        panelInputBG: defaultTheme.color.gray600,
        panelInputBorder: defaultTheme.color.gray800,
    },
});

export const themes = { light, dark };

export type Theme = typeof themes['light'];
