import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Menu extends Component {
  static displayName = 'Menu';

  static propTypes = {
    children: PropTypes.node,
  };

  state = { open: false };

  componentWillUnmount() {
    this.removeEventListeners();
  }

  ref = React.createRef();

  toggleOpen = e => {
    // Event should only fire once on click or escape-key press
    // We need this because it bubbles
    if (e.nativeEvent) {
      e.nativeEvent.stopImmediatePropagation();
    } else {
      e.stopImmediatePropagation();
    }

    const open = !this.state.open;

    this.setState({ open });

    if (open) {
      this.initializeEventListeners();
    } else {
      this.removeEventListeners();
    }
  };

  initializeEventListeners = () => {
    document.addEventListener('click', this.toggleOpen, { once: true });
    document.addEventListener('keydown', this.handleEscape, { once: true });
  };

  handleEscape = e => {
    e.keyCode === 27 && this.toggleOpen(e);
  };

  removeEventListeners = () => {
    document.removeEventListener('click', this.toggleOpen);
    document.removeEventListener('click', this.handleEscape);
  };

  render() {
    const { children, ...rest } = this.props;

    // React.Children.map allows us to not pass key as prop while iterating over children
    const renderChildren = React.Children.map(children, child => {
      return React.cloneElement(child, {
        toggleOpen: this.toggleOpen,
        open: this.state.open,
      });
    });
    return <div {...rest}>{renderChildren}</div>;
  }
}
