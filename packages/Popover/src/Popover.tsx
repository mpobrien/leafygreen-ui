import React, { Component, Fragment, ReactNode, RefObject } from 'react';
import PropTypes from 'prop-types';
import Portal from '@leafygreen-ui/portal';
import { emotion } from '@leafygreen-ui/lib';
import { RefPosition, Align, Justify } from '.';
import {
  getAlignment,
  getJustification,
  getTransformOrigin,
  getTransform,
  calcTop,
  calcLeft,
  getRefPosition,
  defaultRefPosition,
  calcPositionWithoutPortal,
} from './popoverUtilities';

const { css, cx } = emotion;

const rootPopoverStyle = css`
  transition: transform 150ms ease-in-out, opacity 150ms ease-in-out;
  position: absolute;
  pointer-events: none;
  opacity: 0;
`;

interface Props {
  children?: ReactNode;
  active: boolean;
  className?: string;
  align: Align;
  justify: Justify;
  refEl?: RefObject<HTMLElement>;
  usePortal?: boolean;
  getUpdatePosition?: Function;
}
interface State {
  windowHeight: number;
  windowWidth: number;
  hasMounted: boolean;
  referenceElPos: RefPosition;
  contentElPos: RefPosition;
  referenceElement: HTMLElement | null;
}

export default class Popover extends Component<Props, State> {
  static displayName = 'Popover';

  static propTypes = {
    children: PropTypes.node,
    active: PropTypes.bool,
    className: PropTypes.string,
    align: PropTypes.oneOf(Object.keys(Align)),
    justify: PropTypes.oneOf(Object.keys(Justify)),
    refEl: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    usePortal: PropTypes.bool,
    getUpdatePosition: PropTypes.func,
  };

  static defaultProps = {
    align: Align.bottom,
    justify: Justify.start,
    active: false,
    usePortal: true,
  };

  state: State = {
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth,
    hasMounted: false,
    referenceElPos: defaultRefPosition,
    contentElPos: defaultRefPosition,
    referenceElement: null,
  };

  componentDidMount() {
    this.setReferenceElement();
    this.setState({ hasMounted: true });

    window.addEventListener('resize', this.handleWindowResize);
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { align, justify, active } = this.props;
    const {
      windowWidth,
      windowHeight,
      referenceElement,
      referenceElPos,
    } = this.state;

    const posPropsUpdated =
      prevProps.active !== active ||
      prevProps.align !== align ||
      prevProps.justify !== justify;

    const windowUpdated =
      prevState.windowWidth !== windowWidth ||
      prevState.windowHeight !== windowHeight;

    if (!referenceElement || !referenceElPos) {
      this.setReferenceElement();
    }

    if (posPropsUpdated || windowUpdated) {
      this.updateReferencePositions();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  handleWindowResize = () => {
    const { contentElPos } = this.state;

    this.setState(
      {
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth,
      },
      () => {
        if (!contentElPos) {
          const contentEl = this.contentRef && this.contentRef.current;

          if (contentEl) {
            this.setState({
              contentElPos: getRefPosition(contentEl),
            });
          }

          return;
        }
      },
    );
  };

  updateReferencePositions() {
    const { referenceElement } = this.state;
    const newReferenceElPos = getRefPosition(referenceElement);
    const contentEl = this.contentRef && this.contentRef.current;

    if (!contentEl) {
      this.setState({
        referenceElPos: newReferenceElPos,
      });

      return;
    }

    this.setState({
      contentElPos: getRefPosition(contentEl),
      referenceElPos: newReferenceElPos,
    });
  }

  // Sets the element to position relative to based on passed props,
  // and stores it, and it's position in state.
  setReferenceElement() {
    const { refEl: passedRef } = this.props;
    const { referenceElement, referenceElPos } = this.state;

    if (referenceElement) {
      if (!referenceElPos) {
        this.setState({
          referenceElPos: getRefPosition(referenceElement),
        });
      }

      return;
    }

    const newReferenceElement = (() => {
      if (passedRef && passedRef.current) {
        return passedRef.current;
      }

      if (this.placeholderRef && this.placeholderRef.current) {
        const parent = this.placeholderRef.current.parentNode;

        if (parent && parent instanceof HTMLElement) {
          return parent;
        }
      }

      return null;
    })();

    this.setState({
      referenceElement: newReferenceElement,
      referenceElPos: getRefPosition(newReferenceElement),
    });
  }

  // Returns the style object that is used to position and transition the popover component
  calculatePosition() {
    const { usePortal, align, justify } = this.props;
    const { referenceElement, referenceElPos, contentElPos } = this.state;

    // Forced second render to make sure that
    // we have access to refs
    if (!this.state.hasMounted) {
      return;
    }

    if (!referenceElement) {
      this.setReferenceElement();
      return;
    }

    const contentEl = this.contentRef && this.contentRef.current;

    if (!contentElPos) {
      if (contentEl) {
        this.setState({
          contentElPos: getRefPosition(contentEl),
        });
      }

      return;
    }

    const alignment = getAlignment(referenceElPos, contentElPos, align);
    const justification = getJustification(
      referenceElPos,
      contentElPos,
      alignment,
      justify,
    );

    const transformOrigin = getTransformOrigin({
      alignment,
      justification,
    });

    const transform = getTransform(alignment);

    if (!usePortal) {
      return {
        ...calcPositionWithoutPortal(referenceElPos, contentElPos, {
          alignment,
          justification,
        }),
        transformOrigin,
        transform,
      };
    }

    return {
      top: calcTop(referenceElPos, contentElPos, { alignment, justification }),
      left: calcLeft(referenceElPos, contentElPos, {
        alignment,
        justification,
      }),
      transformOrigin,
      transform,
    };
  }

  contentRef = React.createRef<HTMLDivElement>();
  placeholderRef = React.createRef<HTMLDivElement>();

  render() {
    const { children, active, className, usePortal, ...rest } = this.props;

    delete rest.refEl;

    const position = this.calculatePosition();

    const Root = usePortal ? Portal : Fragment;

    const activeStyle = active && {
      transform: 'translate3d(0, 0, 0) scale(1)',
      opacity: 1,
      position: !usePortal && 'absolute',
    };

    const style = css({ ...position, ...activeStyle });

    return (
      <>
        <div
          ref={this.placeholderRef}
          className={css`
            display: none;
          `}
        />
        <Root>
          <div
            {...rest}
            ref={this.contentRef}
            className={cx(rootPopoverStyle, style, className)}
          >
            {children}
          </div>
        </Root>
      </>
    );
  }
}
