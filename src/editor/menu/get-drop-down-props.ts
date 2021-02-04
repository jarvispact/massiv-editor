import React from 'react';

export const getDropdownProps = (width: string) => ({ bg: 'menuDropdownBackground', width, br: 's', boxShadow: 'menuDropdown', as: 'ul' as React.ElementType });
