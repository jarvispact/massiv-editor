import { createCustomTheme, defaultTheme } from './design-system/theme/default-theme';

const light = createCustomTheme({ ...defaultTheme, color: { ...defaultTheme.color, appBackground: '#00ff00' } });
const dark = createCustomTheme({ ...defaultTheme, color: { ...defaultTheme.color, appBackground: '#ff0000' } });

export const themes = { light, dark };

export type Theme = typeof themes['light'];
