import React from 'react';
import { storiesOf } from '@storybook/react';
import SSOMenu from './SSOMenu.tsx';

storiesOf('SSOMenu', module).add('Default', () => (
  <SSOMenu
    userInfo={{ name: 'Alex Smith', email: 'alex.smith@youwork.com' }}
    activeProduct="atlas"
  />
));
