import { createCustomTheme, defaultTheme } from 'massiv-design-system';

const base = {
    gray50: '#FAFAFA',
    gray100: '#F5F5F5',
    gray200: '#E5E5E5',
    gray300: '#D4D4D4',
    gray400: '#A3A3A3',
    gray500: '#737373',
    gray600: '#525252',
    gray700: '#404040',
    gray800: '#262626',
    gray900: '#171717',

    error50: '#FEF2F2',
    error100: '#FEE2E2',
    error200: '#FECACA',
    error300: '#FCA5A5',
    error400: '#F87171',
    error500: '#EF4444',
    error600: '#DC2626',
    error700: '#B91C1C',
    error800: '#991B1B',
    error900: '#7F1D1D',

    warning50: '#FFFBEB',
    warning100: '#FEF3C7',
    warning200: '#FDE68A',
    warning300: '#FCD34D',
    warning400: '#FBBF24',
    warning500: '#F59E0B',
    warning600: '#D97706',
    warning700: '#B45309',
    warning800: '#92400E',
    warning900: '#78350F',

    success50: '#F0FDF4',
    success100: '#DCFCE7',
    success200: '#BBF7D0',
    success300: '#86EFAC',
    success400: '#4ADE80',
    success500: '#22C55E',
    success600: '#16A34A',
    success700: '#15803D',
    success800: '#166534',
    success900: '#14532D',
} as const;

const orange = {
    primary50: '#FFF7ED',
    primary100: '#FFEDD5',
    primary200: '#FED7AA',
    primary300: '#FDBA74',
    primary400: '#FB923C',
    primary500: '#F97316',
    primary600: '#EA580C',
    primary700: '#C2410C',
    primary800: '#9A3412',
    primary900: '#7C2D12',

    secondary50: '#ECFDF5',
    secondary100: '#D1FAE5',
    secondary200: '#A7F3D0',
    secondary300: '#6EE7B7',
    secondary400: '#34D399',
    secondary500: '#10B981',
    secondary600: '#059669',
    secondary700: '#047857',
    secondary800: '#065F46',
    secondary900: '#064E3B',
} as const;

const blue = {
    primary50: '#a1c6ea',
    primary100: '#8ebae5',
    primary200: '#7bafe1',
    primary300: '#68a3dd',
    primary400: '#5598d8',
    primary500: '#428cd4',
    primary600: '#3b7ebf',
    primary700: '#3570aa',
    primary800: '#2e6294',
    primary900: '#28547f',

    secondary50: '#f5a2c9',
    secondary100: '#f28fbe',
    secondary200: '#f07cb3',
    secondary300: '#ee69a8',
    secondary400: '#ec579d',
    secondary500: '#ea4492',
    secondary600: '#d33d83',
    secondary700: '#bb3675',
    secondary800: '#a43066',
    secondary900: '#8c2958',
} as const;

const orangeLight = createCustomTheme({
    ...defaultTheme,
    color: {
        ...base,
        ...orange,
        canvasBackground: base.gray200,
        editorBackground: base.gray300,
        menuBackground: base.gray300,
        text: base.gray900,
        inputBackground: base.gray100,
    },
});

const orangeDark = createCustomTheme({
    ...defaultTheme,
    color: {
        ...base,
        ...orange,
        canvasBackground: base.gray600,
        editorBackground: base.gray700,
        menuBackground: base.gray700,
        text: base.gray100,
        inputBackground: base.gray900,
    },
});

const blueLight = createCustomTheme({
    ...defaultTheme,
    color: {
        ...base,
        ...blue,
        canvasBackground: base.gray200,
        editorBackground: base.gray300,
        menuBackground: base.gray300,
        text: base.gray900,
        inputBackground: base.gray100,
    },
});

const blueDark = createCustomTheme({
    ...defaultTheme,
    color: {
        ...base,
        ...blue,
        canvasBackground: base.gray600,
        editorBackground: base.gray700,
        menuBackground: base.gray700,
        text: base.gray100,
        inputBackground: base.gray900,
    },
});

export const themes = {
    orangeLight,
    orangeDark,
    blueLight,
    blueDark,
} as const;

export type Theme = typeof themes['orangeLight'];
export type ThemeKey = keyof typeof themes;
