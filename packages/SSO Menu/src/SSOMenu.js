import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Menu from './Menu';
import MenuButton from './MenuButton';
import MenuList from './MenuList';
import MenuItem from './MenuItem';
import MenuGroup from './MenuGroup';
import ItemSubText from './ItemSubText';
import Button from '@leafygreen-ui/Button';
import { colors } from '@leafygreen-ui/theme';
import { emotion, ccClassName } from '@leafygreen-ui/lib';

const { css } = emotion;

const nameStyle = css`
  margin: 0px;
  font-size: 16px;
  color: ${colors.gray[1]};
  margin-top: 4px;
  margin-bottom: 2px;
`;

const buttonStyle = css`
  margin-top: 10px;
  width: 100%;
`;

const truncate = css`
  width: 162px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const menuItems = [
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
    slug: 'cloud',
  },
];

export default class SSOMenu extends Component {
  static displayName = 'SSOMenu';

  static propTypes = {
    userInfo: PropTypes.object,
    activeTab: PropTypes.string,
    onLogout: PropTypes.func.isRequired,
    onProductChange: PropTypes.func,
    onAccountClick: PropTypes.func,
  };

  static defaultProps = {
    userInfo: { name: '', email: '' },
    activeTab: '',
    onProductChange: () => {},
    onAccountClick: () => {},
  };

  constructor(props) {
    super(props);
    this.state = { buttonRef: null };
  }

  setButtonRef = button => {
    this.setState({ buttonRef: button });
  };

  render() {
    const {
      userInfo: { name, email },
      activeTab,
      onLogout,
      onProductChange,
      onAccountClick,
    } = this.props;

    return (
      <Menu>
        <MenuButton setButtonRef={this.setButtonRef}>{name}</MenuButton>
        <MenuList
          parentRef={this.state.buttonRef && this.state.buttonRef.current}
        >
          <MenuGroup
            className={css`
              padding: 14px 16px;
            `}
          >
            <h3 className={ccClassName(nameStyle, truncate)}>{name}</h3>
            <ItemSubText>{email}</ItemSubText>
            <Button
              size="small"
              onClick={onAccountClick}
              className={buttonStyle}
            >
              MongoDB Account
            </Button>
          </MenuGroup>

          <MenuGroup>
            {menuItems.map(el => (
              <MenuItem
                variant="product"
                onClick={onProductChange}
                key={el.displayName}
                isActive={activeTab === el.slug}
                title={el.displayName}
                description={el.description}
                href={el.href}
              />
            ))}
          </MenuGroup>

          <MenuItem
            key={'logout'}
            variant="logout"
            onLogout={onLogout}
            title="Logout"
          />
        </MenuList>
      </Menu>
    );
  }
}
