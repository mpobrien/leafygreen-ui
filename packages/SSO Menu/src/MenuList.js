import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Portal from '@leafygreen-ui/Portal';
import { positionMenu } from './utils';
import { colors } from '@leafygreen-ui/theme';
import { emotion, ccClassName } from '@leafygreen-ui/lib';

const { css } = emotion;

const rootMenuListStyle = css`
  transform: translate3d(0, -12px, 0) scale(0.85);
  transition: all 150ms ease-in-out;
  transform-origin: bottom;
  opacity: 0;
  width: 202px;
  border: 1px solid ${colors.gray[7]};
  border-radius: 3px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  padding: 0px;
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: ${colors.mongodb.white};
  margin-block-start: 0;
  margin-block-end: 0;
  pointer-events: none;
`;

const activeMenuListStyle = css`
  transform: translate3d(0, 0, 0) scale(1);
  opacity: 1;
  pointer-events: initial;
`;

export default class MenuList extends Component {
  static displayName = 'MenuList';

  static propTypes = {
    open: PropTypes.bool,
    children: PropTypes.node,
    toggleOpen: PropTypes.func,
    parentRef: PropTypes.object,
  };

  render() {
    const { open, children, parentRef } = this.props;

    return (
      <Portal>
        <ul
          className={ccClassName(
            rootMenuListStyle,
            open ? activeMenuListStyle : '',
          )}
          style={parentRef && positionMenu('right', parentRef)}
        >
          {children}
        </ul>
      </Portal>
    );
  }
}
