import { createCustomTheme, defaultTheme } from 'massiv-design-system';

const light = createCustomTheme({
    ...defaultTheme,
    color: {
        ...defaultTheme.color,
        appBackground: defaultTheme.color.gray200,
    },
});

const dark = createCustomTheme({
    ...defaultTheme,
    color: {
        ...defaultTheme.color,
        appBackground: defaultTheme.color.gray800,
    },
});

export const themes = { light, dark };

export type Theme = typeof themes['light'];
