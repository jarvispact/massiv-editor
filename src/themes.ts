import { createCustomTheme, defaultTheme } from 'massiv-design-system';

const colors = {
    gray50: '#F9FAFB',
    gray100: '#F3F4F6',
    gray200: '#E5E7EB',
    gray300: '#D1D5DB',
    gray400: '#9CA3AF',
    gray500: '#6B7280',
    gray600: '#4B5563',
    gray700: '#374151',
    gray800: '#1F2937',
    gray900: '#111827',

    primary50: '#EFF6FF',
    primary100: '#DBEAFE',
    primary200: '#BFDBFE',
    primary300: '#93C5FD',
    primary400: '#60A5FA',
    primary500: '#3B82F6',
    primary600: '#2563EB',
    primary700: '#1D4ED8',
    primary800: '#1E40AF',
    primary900: '#1E3A8A',

    secondary50: '#FDF2F8',
    secondary100: '#FCE7F3',
    secondary200: '#FBCFE8',
    secondary300: '#F9A8D4',
    secondary400: '#F472B6',
    secondary500: '#EC4899',
    secondary600: '#DB2777',
    secondary700: '#BE185D',
    secondary800: '#9D174D',
    secondary900: '#831843',
} as const;

const light = createCustomTheme({
    ...defaultTheme,
    color: {
        ...defaultTheme.color,
        ...colors,
        appBackground500: colors.gray200,
        appBackground900: colors.gray300,
        textColor: colors.gray900,
    },
});

const dark = createCustomTheme({
    ...defaultTheme,
    color: {
        ...defaultTheme.color,
        ...colors,
        appBackground500: colors.gray600,
        appBackground900: colors.gray700,
        textColor: colors.gray100,
    },
});

export const themes = { light, dark } as const;
export type Theme = typeof themes['light'];
export type ThemeKey = keyof typeof themes;
