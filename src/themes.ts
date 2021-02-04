import { createCustomTheme, defaultTheme } from 'massiv-design-system';

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

const light = {
    canvasBackground: defaultTheme.color.gray300,
    editorBackground: defaultTheme.color.gray100,
    editorHeadingBackground: defaultTheme.color.gray200,
    menuBackground: defaultTheme.color.gray100,
    menuDropdownBackground: defaultTheme.color.gray100,
    menuDropdownHoverBackground: defaultTheme.color.gray200,
    menuDropdownDividerBackground: defaultTheme.color.gray200,
    text: defaultTheme.color.gray900,
    inputBackground: '#ffffff',
} as const;

const dark = {
    canvasBackground: defaultTheme.color.gray900,
    editorBackground: defaultTheme.color.gray700,
    editorHeadingBackground: defaultTheme.color.gray800,
    menuBackground: defaultTheme.color.gray700,
    menuDropdownBackground: defaultTheme.color.gray700,
    menuDropdownHoverBackground: defaultTheme.color.gray800,
    menuDropdownDividerBackground: defaultTheme.color.gray800,
    text: defaultTheme.color.gray100,
    inputBackground: defaultTheme.color.gray900,
} as const;

const lightShadow = {
    ...defaultTheme.boxShadow,
    menuDropdown: `2px 2px 6px 2px ${defaultTheme.color.gray500}`,
} as const;

const darkShadow = {
    ...defaultTheme.boxShadow,
    menuDropdown: `2px 2px 6px 2px rgba(0, 0, 0, 0.7)`,
} as const;

const orangeLight = createCustomTheme({
    ...defaultTheme,
    color: {
        ...defaultTheme.color,
        ...orange,
        ...light,
    },
    boxShadow: lightShadow,
});

const orangeDark = createCustomTheme({
    ...defaultTheme,
    color: {
        ...defaultTheme.color,
        ...orange,
        ...dark,
    },
    boxShadow: darkShadow,
});

const blueLight = createCustomTheme({
    ...defaultTheme,
    color: {
        ...defaultTheme.color,
        ...blue,
        ...light,
    },
    boxShadow: lightShadow,
});

const blueDark = createCustomTheme({
    ...defaultTheme,
    color: {
        ...defaultTheme.color,
        ...blue,
        ...dark,
    },
    boxShadow: darkShadow,
});

export const themes = {
    orangeLight,
    orangeDark,
    blueLight,
    blueDark,
} as const;

export type Theme = typeof themes['orangeLight'];
export type ThemeKey = keyof typeof themes;
