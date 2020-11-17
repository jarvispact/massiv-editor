const breakpoint = {
    s: '640px',
    m: '768px',
    l: '1024px',
    xl: '1280px',
    '2xl': '1600px',
    '3xl': '1920px',
};

const color = {
    gray100: '#f7fafc',
    gray200: '#edf2f7',
    gray300: '#e2e8f0',
    gray400: '#cbd5e0',
    gray500: '#a0aec0',
    gray600: '#718096',
    gray700: '#4a5568',
    gray800: '#2d3748',
    gray900: '#1a202c',

    error100: '#fff5f5',
    error200: '#fed7d7',
    error300: '#feb2b2',
    error400: '#fc8181',
    error500: '#f56565',
    error600: '#e53e3e',
    error700: '#c53030',
    error800: '#9b2c2c',
    error900: '#742a2a',

    warning100: '#fffff0',
    warning200: '#fefcbf',
    warning300: '#faf089',
    warning400: '#f6e05e',
    warning500: '#ecc94b',
    warning600: '#d69e2e',
    warning700: '#b7791f',
    warning800: '#975a16',
    warning900: '#744210',

    success100: '#f0fff4',
    success200: '#c6f6d5',
    success300: '#9ae6b4',
    success400: '#68d391',
    success500: '#48bb78',
    success600: '#38a169',
    success700: '#2f855a',
    success800: '#276749',
    success900: '#22543d',

    primary100: '#ebf8ff',
    primary200: '#bee3f8',
    primary300: '#90cdf4',
    primary400: '#63b3ed',
    primary500: '#4299e1',
    primary600: '#3182ce',
    primary700: '#2b6cb0',
    primary800: '#2c5282',
    primary900: '#2a4365',

    secondary100: '#fff5f7',
    secondary200: '#fed7e2',
    secondary300: '#fbb6ce',
    secondary400: '#f687b3',
    secondary500: '#ed64a6',
    secondary600: '#d53f8c',
    secondary700: '#b83280',
    secondary800: '#97266d',
    secondary900: '#702459',
};

const spacing = {
    xs: '0.15rem',
    s: '0.25rem',
    m: '0.5rem',
    l: '0.75rem',
    xl: '1rem',
    '2xl': '2rem',
    '3xl': '3rem',
    '4xl': '4rem',
    '5xl': '5rem',
    '6xl': '6rem',
};

const width = {
    ...spacing,
    '1/4': '25%',
    '1/3': '33.3%',
    '1/2': '50%',
    '1': '100%',
};

const height = {
    ...spacing,
    '1/4': '25%',
    '1/3': '33.3%',
    '1/2': '50%',
    '1': '100%',
};

const fontFamily = {
    sans: [
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
    ].join(', '),
    serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'].join(', '),
    mono: ['Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'].join(', '),
};

const fontSize = {
    xs: '0.75rem',
    s: '0.875rem',
    m: '1rem',
    l: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '4rem',
};

const fontWeight = {
    xxs: '100',
    xs: '200',
    s: '300',
    m: '400',
    l: '500',
    xl: '600',
    '2xl': '700',
    '3xl': '800',
    '4xl': '900',
};

const lineHeight = {
    xs: '0.75rem',
    s: '0.875rem',
    m: '1rem',
    l: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '4rem',
};

const letterSpacing = {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
};

const radii = {
    s: '2px',
    m: '4px',
    l: '8px',
};

const boxShadow = {
    xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
    s: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    m: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    l: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
};

const textShadow = {};

export const defaultTheme = {
    breakpoint,
    color,
    spacing,
    width,
    height,
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight,
    letterSpacing,
    radii,
    boxShadow,
    textShadow,
};

export type Theme = typeof defaultTheme;
export type ThemeScope = keyof Theme;

export const createCustomTheme = <T extends Theme>(theme: T): T => theme;
