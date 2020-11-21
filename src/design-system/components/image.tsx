import React from 'react';
import { BoxProps, createBox } from './box';

const Box = createBox({ forwardPropertyBlacklist: ['color', 'spacing', 'display', 'fontFamily', 'fontSize'] });

export const Image: React.FC<BoxProps> = (props) => <Box as="img" {...props} />;
