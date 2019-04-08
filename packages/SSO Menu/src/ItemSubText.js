import React from 'react';
import { emotion, ccClassName } from '@leafygreen-ui/lib';
import { colors } from '@leafygreen-ui/theme';

const { css } = emotion;

const descriptionStyle = css`
  margin: 0px;
  display: block;
  font-weight: normal;
  font-size: 12px;
  color: ${colors.gray[3]};
`;

const ItemSubText = ({ className, children }) => (
  <label className={ccClassName(descriptionStyle, className)}>{children}</label>
);

export default ItemSubText;
