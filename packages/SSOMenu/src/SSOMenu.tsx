import * as React from 'react';
import PropTypes from 'prop-types';
import { emotion } from '@leafygreen-ui/lib';
import { colors } from '@leafygreen-ui/theme';
import { cx } from 'emotion';
import Button from '@leafygreen-ui/button';
import Icon from '@leafygreen-ui/icon';
import Menu, { MenuList, MenuItem } from '@leafygreen-ui/menu';

const { css } = emotion;

const menuButtonStyle = css`
  height: 29x;
  padding: 7px 14px;
  border: 1px solid ${colors.gray[5]};
  border-radius: 14.5px;
  cursor: pointer;
  transition: background 200ms ease-in-out;
  display: flex;
  color: ${colors.gray[4]};
  font-size: 12px;
  line-height: 15px;
  position: relative;

  &:hover {
    background-color: ${colors.gray[7]};
    color: ${colors.gray[3]};
  }

  &:focus {
    outline: none;
  }
`;

const activeMenuButtonStyle = css`
  background-color: ${colors.gray[5]};
  color: ${colors.mongodb.white};

  &:hover {
    background-color: ${colors.gray[5]};
    color: ${colors.mongodb.white};
  }
`;

const nameStyle = css`
  margin: 0px;
  font-size: 16px;
  color: ${colors.gray[1]};
  margin-top: 4px;
  margin-bottom: 2px;
`;

const truncate = css`
  width: 162px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const accountMenuListStyle = css`
  padding: 14px 15px;
`;

const accountButtonStyle = css`
  margin-top: 10px;
  width: 100%;
`;

const productContainerHeight = css`
  height: 42px;
`;

const activeMenuItemStyle = css`
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

const menuItemTextStyle = css`
  font-size: 14px;
  line-height: 16px;
  cursor: pointer;
  margin: 0px;
`;

const descriptionStyle = css`
  margin: 0px;
  display: block;
  font-weight: normal;
  font-size: 12px;
  color: ${colors.gray[3]};
  text-decoration: none;
`;

const logoutContainerHeight = css`
  height: 46px;
`;

const menuItems: {
  displayName: string;
  description: string;
  href: string;
  slug: string;
}[] = [
  {
    displayName: 'Atlas',
    description: 'cloud.mongodb.com',
    href: 'https://cloud.mongodb.com',
    slug: 'atlas',
  },
  {
    displayName: 'University',
    description: 'university.mongodb.com',
    href: 'https://university.mongodb.com',
    slug: 'university',
  },
  {
    displayName: 'Cloud Support',
    description: 'support.mongodb.com',
    href: 'https://support.mongodb.com',
    slug: 'support',
  },
];

interface Props {
  userInfo: { name: string; email: string };
  activeProduct: string;
  onLogout: Function;
  onProductChange: Function;
  onAccountClick: Function;
}

interface State {
  active: boolean;
}

export default class SSOMenu extends React.Component<Props, State> {
  static displayName = 'SSOMenu';

  static propTypes = {
    userInfo: PropTypes.object,
    activeProduct: PropTypes.oneOf(['atlas', 'support', 'university']),
    onLogout: PropTypes.func,
    onProductChange: PropTypes.func,
    onAccountClick: PropTypes.func,
  };

  state: State = { active: false };

  componentWillUnmount() {
    this.removeEventListeners();
  }

  triggerRef = React.createRef<HTMLButtonElement>();

  toggleActive = e => {
    // Event should only fire once on click or escape-key press
    // We need this because it bubbles
    if (e.nativeEvent) {
      e.nativeEvent.stopImmediatePropagation();
    } else {
      e.stopImmediatePropagation();
    }

    const active = !this.state.active;

    this.setState({ active });

    if (active) {
      this.initializeEventListeners();
    } else {
      this.removeEventListeners();
    }
  };

  initializeEventListeners = () => {
    document.addEventListener('click', this.toggleActive, { once: true });
    document.addEventListener('keydown', this.handleEscape, { once: true });
  };

  handleEscape = e => {
    e.keyCode === 27 && this.toggleActive(e);
  };

  removeEventListeners = () => {
    document.removeEventListener('click', this.toggleActive);
    document.removeEventListener('click', this.handleEscape);
  };

  render() {
    const activeButtonStyle = this.state.active && activeMenuButtonStyle;

    const { active } = this.state;
    const {
      userInfo: { name, email },
      activeProduct,
      onLogout,
      onProductChange,
      onAccountClick,
    } = this.props;
    return (
      <>
        <button
          className={cx(menuButtonStyle, activeButtonStyle)}
          ref={this.triggerRef}
          type="button"
          onClick={this.toggleActive}
        >
          <span style={{ marginRight: '2px' }}>{name}</span>
          {active ? (
            <Icon glyph="CaretUp" fill={colors.mongodb.white} />
          ) : (
            <Icon glyph="CaretDown" fill={colors.gray[4]} />
          )}
        </button>

        <Menu
          active={active}
          align="bottom"
          justify="end"
          refEl={this.triggerRef}
        >
          <MenuList className={accountMenuListStyle}>
            <h3 className={cx(nameStyle, truncate)}>{name}</h3>
            <p className={descriptionStyle}>{email}</p>
            <Button
              className={accountButtonStyle}
              size="small"
              onClick={onAccountClick}
            >
              MongoDB Account
            </Button>
          </MenuList>
          <MenuList>
            {menuItems.map(el => (
              <MenuItem
                onSelect={onProductChange}
                key={el.displayName}
                className={cx(productContainerHeight, {
                  [activeMenuItemStyle]: el.slug === activeProduct,
                })}
              >
                <p className={menuItemTextStyle}>{el.displayName}</p>
                <a href={el.href} className={descriptionStyle}>
                  {el.description}
                </a>
              </MenuItem>
            ))}
          </MenuList>
          <MenuItem
            onSelect={onLogout}
            className={cx(logoutContainerHeight, menuItemTextStyle)}
          >
            Logout
          </MenuItem>
        </Menu>
      </>
    );
  }
}
