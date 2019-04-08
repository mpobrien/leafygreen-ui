import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ItemSubText from './ItemSubText';

import { colors } from '@leafygreen-ui/theme';
import { ccClassName, emotion } from '@leafygreen-ui/lib';

const { css } = emotion;

const rootStyle = css`
  list-style: none;
`;

const rootVariant = {
  logout: css`
    height: 46px;
  `,

  product: css`
    height: 42px;
  `,
};

const containerStyle = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 16px;
  text-decoration: none;
  margin: 0px;
  &:hover {
    background-color: ${colors.gray[8]};
    transition: background 300ms ease-in-out;
  }
`;

const titleTextStyle = {
  product: css`
    font-size: 14px;
    line-height: 16px;
    cursor: pointer;
    margin: 0px;
  `,

  logout: css`
    font-size: 14px;
    line-height: 16px;
    cursor: pointer;
    margin: 0px;
  `,
};

const activeStyle = css`
  background-color: ${colors.gray[8]};
  position: relative;
  &:before {
    content: '';
    position: absolute;
    width: 3px;
    top: 0;
    bottom: 0;
    left: -1px;
    background-color: ${colors.green[3]};
  }
`;

const baseTextStyle = css`
  color: ${colors.gray[1]};
  text-decoration: none;
`;

export default class MenuItem extends Component {
  static displayName = 'MenuItem';

  static propTypes = {
    href: PropTypes.string,
    isActive: PropTypes.bool,
    onProductChange: PropTypes.func,
    onLogout: PropTypes.func,
    title: PropTypes.string,
    description: PropTypes.string,
    variant: PropTypes.string,
  };

  static defaultProps = {
    activeTab: false,
  };

  onSelect = () => {
    const { onProductChange, onLogout } = this.props;
    if (onProductChange) {
      onProductChange();
    }

    if (onLogout) {
      onLogout();
    }
  };

  render() {
    const { href, isActive, title, description, variant } = this.props;

    const Root = href ? 'a' : 'div';

    const activeContainerStyle = isActive ? activeStyle : '';

    return (
      <li className={ccClassName(rootStyle, rootVariant[variant])}>
        <Root
          onClick={this.onSelect}
          href={href}
          className={ccClassName(containerStyle, activeContainerStyle)}
        >
          <div className={ccClassName(baseTextStyle, titleTextStyle[variant])}>
            {title}
          </div>
          <ItemSubText>{description}</ItemSubText>
        </Root>
      </li>
    );
  }
}
