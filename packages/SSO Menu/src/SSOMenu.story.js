import React from 'react';
import { storiesOf } from '@storybook/react';
import SSOMenu from './SSOMenu';

storiesOf('SSOMenu', module).add('Default', () => (
  <SSOMenu
    userInfo={{ name: 'Alex Smith', email: 'alex.smith@youwork.com' }}
    activeTab="atlas"
    onLogout={() => console.log('logging out')}
    onProductChange={() => console.log('product is changing')}
    onAccountClick={() => console.log('accounting')}
  />
));
