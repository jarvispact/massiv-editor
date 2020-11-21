import React, { useState, useContext } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { defaultTheme, Theme } from './default-theme';

type Themes = {
    [key: string]: Theme;
};

type Ctx<T extends Theme> = {
    theme: T;
    setTheme: (t: string) => void;
};

export const ThemeContext = React.createContext<Ctx<Theme>>({
    theme: defaultTheme,
    setTheme: () => {},
});

type Props<T extends Themes> = {
    themes: T;
    theme: keyof T;
    children: React.ReactNode;
};

export const ThemeProvider = <T extends Themes>({ themes, theme, children }: Props<T>) => {
    const [activeTheme, setActiveTheme] = useState(theme);

    const context = {
        theme: themes[activeTheme],
        setTheme: setActiveTheme,
    };

    return (
        <ThemeContext.Provider value={context}>
            <StyledThemeProvider theme={context.theme}>{children}</StyledThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useTheme = <T extends Theme>() => useContext<Ctx<T>>((ThemeContext as any) as React.Context<Ctx<T>>);
