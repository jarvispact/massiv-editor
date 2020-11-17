import { Theme } from '../theme/default-theme';

type LiteralUnion<T extends U, U = string> = T | (U & { __literal_union__?: never });
type UnpackThemeScope<T extends Theme, K extends keyof T> = Extract<keyof T[K], string>;

export type ResponsiveProp<T extends string = string> = LiteralUnion<T> | Array<LiteralUnion<T>>;
export type ResponsiveThemeProp<T extends Theme, K extends keyof T> = ResponsiveProp<UnpackThemeScope<T, K>>;
