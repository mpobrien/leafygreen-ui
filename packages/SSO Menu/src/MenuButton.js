import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DownArrow } from './DownArrow.js';

import { colors } from '@leafygreen-ui/theme';
import { ccClassName, emotion } from '@leafygreen-ui/lib';

const { css } = emotion;

const buttonTextStyle = css`
  color: ${colors.gray[4]};
  font-size: 12px;
  line-height: 15px;
  display: flex;
`;

const buttonStyle = css`
  height: 29x;
  padding: 7px 14px;
  border: 1px solid ${colors.gray[5]};
  border-radius: 14.5px;
  cursor: pointer;
  transition: background 200ms ease-in-out;
  &:hover {
    background-color: ${colors.gray[7]};
    .${buttonTextStyle} {
      color: ${colors.gray[3]};
    }
  }
  &:focus {
    outline: none;
  }
`;

const buttonActiveStyle = css`
  background-color: ${colors.gray[5]};
  .${buttonTextStyle} {
    color: ${colors.mongodb.white};
  }
  &:hover {
    background-color: ${colors.gray[5]};
    .${buttonTextStyle} {
      color: ${colors.mongodb.white};
    }
  }
`;

export default class MenuButton extends Component {
  static displayName = 'MenuButton';

  static propTypes = {
    children: PropTypes.any,
    toggleOpen: PropTypes.func,
    open: PropTypes.bool,
    setButtonRef: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.buttonRef = React.createRef();
    this.props.setButtonRef(this.buttonRef);
  }

  render() {
    const { children, open, toggleOpen } = this.props;

    const activeButton = open ? buttonActiveStyle : '';

    const buttonIconStyle = {
      display: 'inline-flex',
      marginLeft: '5px',
      alignSelf: 'center',
      transition: 'transform 200ms ease-out',
    };

    open ? (buttonIconStyle.transform = 'rotate(-180deg)') : null;

    return (
      <button
        ref={this.buttonRef}
        type="button"
        onClick={toggleOpen}
        className={ccClassName(buttonStyle, activeButton)}
      >
        <span className={buttonTextStyle}>
          {children}
          <DownArrow
            style={buttonIconStyle}
            fill={open ? colors.mongodb.white : colors.gray[4]}
          />
        </span>
      </button>
    );
  }
}
