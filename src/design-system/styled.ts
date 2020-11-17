import * as styledComponents from 'styled-components';
import { ThemedStyledComponentsModule } from 'styled-components';
import { Theme } from './theme/default-theme';

const { default: styled, css, createGlobalStyle, keyframes } = styledComponents as ThemedStyledComponentsModule<Theme>;

export { styled, css, createGlobalStyle, keyframes };
