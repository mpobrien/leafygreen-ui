import React from 'react';
import { colors } from '@leafygreen-ui/theme';
import { emotion, ccClassName } from '@leafygreen-ui/lib';

const { css } = emotion;

const borderStyle = css`
  border-bottom: 1px solid ${colors.gray[7]};
`;

const MenuGroup = ({ className, children }) => (
  <div className={ccClassName(borderStyle, className)}>{children}</div>
);

export default MenuGroup;
