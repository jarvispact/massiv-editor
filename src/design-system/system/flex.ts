import { CssPropertyConfig } from '../utils/build-css';
import { ResponsiveProp } from '../utils/types';

export type FlexProps = {
    flexDirection?: ResponsiveProp;
    flexWrap?: ResponsiveProp;
    flexFlow?: ResponsiveProp;
    justifyContent?: ResponsiveProp;
    alignItems?: ResponsiveProp;
    alignContent?: ResponsiveProp;
    flexOrder?: ResponsiveProp;
    flexGrow?: ResponsiveProp;
    flexShrink?: ResponsiveProp;
    flexBasis?: ResponsiveProp;
    flex?: ResponsiveProp;
    alignSelf?: ResponsiveProp;
};

export const flexConfig: CssPropertyConfig[] = [
    // flex parent config
    {
        cssProperty: 'flex-direction',
        componentProps: ['flexDirection'],
        themeScope: null,
    },
    {
        cssProperty: 'flex-wrap',
        componentProps: ['flexWrap'],
        themeScope: null,
    },
    {
        cssProperty: 'flex-flow',
        componentProps: ['flexFlow'],
        themeScope: null,
    },
    {
        cssProperty: 'justify-content',
        componentProps: ['justifyContent'],
        themeScope: null,
    },
    {
        cssProperty: 'align-items',
        componentProps: ['alignItems'],
        themeScope: null,
    },
    {
        cssProperty: 'align-content',
        componentProps: ['alignContent'],
        themeScope: null,
    },
    // flex child config
    {
        cssProperty: 'flex-order',
        componentProps: ['flexOrder'],
        themeScope: null,
    },
    {
        cssProperty: 'flex-grow',
        componentProps: ['flexGrow'],
        themeScope: null,
    },
    {
        cssProperty: 'flex-shrink',
        componentProps: ['flexShrink'],
        themeScope: null,
    },
    {
        cssProperty: 'flex-basis',
        componentProps: ['flexBasis'],
        themeScope: null,
    },
    {
        cssProperty: 'flex',
        componentProps: ['flex'],
        themeScope: null,
    },
    {
        cssProperty: 'align-self',
        componentProps: ['alignSelf'],
        themeScope: null,
    },
];
