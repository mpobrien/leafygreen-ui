import {
  Align,
  Justification,
  AbstractPosition,
  RefPosition,
  Justify,
  AbsolutePositionObject,
} from '.';

export const defaultRefPosition = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  height: 0,
  width: 0,
};

// Determines the alignment to render based on an order of alignment fallbacks
// Returns the first alignment that doesn't collide with the window,
// defaulting to the align prop if all alignments fail.
export function getAlignment(
  referenceElPos: RefPosition,
  contentElPos: RefPosition,
  align: Align,
) {
  const alignments: {
    top: ReadonlyArray<Align>;
    bottom: ReadonlyArray<Align>;
    left: ReadonlyArray<Align>;
    right: ReadonlyArray<Align>;
  } = {
    top: [Align.top, Align.bottom],
    bottom: [Align.bottom, Align.top],
    left: [Align.left, Align.right],
    right: [Align.right, Align.left],
  };

  return (
    alignments[align].find(candidate =>
      checkAlignment(referenceElPos, contentElPos, candidate),
    ) || align
  );
}

// Checks that an alignment will not cause the popover to collide with the window.
export function checkAlignment(
  referenceElPos: RefPosition,
  contentElPos: RefPosition,
  alignment: Align,
) {
  const top = calcTop(referenceElPos, contentElPos, { alignment });
  const left = calcLeft(referenceElPos, contentElPos, { alignment });

  if (['top', 'bottom'].includes(alignment)) {
    return checkVerticalWindowCollision(contentElPos, top);
  }

  if (['left', 'right'].includes(alignment)) {
    return checkHorizontalWindowCollision(contentElPos, left);
  }

  return false;
}

// Determines the justification to render based on an order of justification fallbacks
// Returns the first justification that doesn't collide with the window,
// defaulting to the justify prop if all justifications fail.
export function getJustification(
  referenceElPos: RefPosition,
  contentElPos: RefPosition,
  align: Align,
  justify: Justify,
) {
  let justifications: {
    start: ReadonlyArray<Justification>;
    middle: ReadonlyArray<Justification>;
    end: ReadonlyArray<Justification>;
  };

  switch (align) {
    case 'left':
    case 'right': {
      justifications = {
        start: [
          Justification.top,
          Justification.bottom,
          Justification['center-vertical'],
        ],
        middle: [
          Justification['center-vertical'],
          Justification.bottom,
          Justification.top,
        ],
        end: [
          Justification.bottom,
          Justification.top,
          Justification['center-vertical'],
        ],
      };
      break;
    }

    case 'top':
    case 'bottom':
    default: {
      justifications = {
        start: [
          Justification.left,
          Justification.right,
          Justification['center-horizontal'],
        ],
        middle: [
          Justification['center-horizontal'],
          Justification.right,
          Justification.left,
        ],
        end: [
          Justification.right,
          Justification.left,
          Justification['center-horizontal'],
        ],
      };
      break;
    }
  }

  return (
    justifications[justify].find(candidate => {
      return checkJustification(referenceElPos, contentElPos, candidate);
    }) || justifications[justify][0]
  );
}

// Checks that a justification will not cause the popover to collide with the window.
export function checkJustification(
  referenceElPos: RefPosition,
  contentElPos: RefPosition,
  justification: Justification,
) {
  const top = calcTop(referenceElPos, contentElPos, { justification });
  const left = calcLeft(referenceElPos, contentElPos, { justification });

  if (['top', 'bottom', 'center-vertical'].includes(justification)) {
    return checkVerticalWindowCollision(contentElPos, top);
  }

  if (['left', 'right', 'center-horizontal'].includes(justification)) {
    return checkHorizontalWindowCollision(contentElPos, left);
  }

  return false;
}

// Returns the 'top' position in pixels for a valid alignment or justification.
export function calcTop(
  referenceElPos: RefPosition,
  contentElPos: RefPosition,
  { alignment, justification }: AbstractPosition,
) {
  switch (justification) {
    case Justification.top:
      return referenceElPos.top;

    case Justification.bottom:
      return referenceElPos.top + referenceElPos.height - contentElPos.height;

    case Justification['center-vertical']:
      return (
        referenceElPos.top + referenceElPos.height / 2 - contentElPos.height / 2
      );
  }

  switch (alignment) {
    case Align.top:
      return referenceElPos.top - contentElPos.height;

    case Align.bottom:
    default:
      return referenceElPos.top + referenceElPos.height;
  }
}

// Returns the 'left' position in pixels for a valid alignment or justification.
export function calcLeft(
  referenceElPos: RefPosition,
  contentElPos: RefPosition,
  { alignment, justification }: AbstractPosition,
) {
  switch (alignment) {
    case Align.left:
      return referenceElPos.left - contentElPos.width;

    case Align.right:
      return referenceElPos.left + referenceElPos.width;
  }

  switch (justification) {
    case Justification.right:
      return referenceElPos.left + referenceElPos.width - contentElPos.width;

    case Justification['center-horizontal']:
      return (
        referenceElPos.left + referenceElPos.width / 2 - contentElPos.width / 2
      );

    case Justification.left:
    default:
      return referenceElPos.left;
  }
}

// Check if horizontal position collides with edge of window
export function checkHorizontalWindowCollision(
  contentElPos: RefPosition,
  left: number,
) {
  const tooWide = left + contentElPos.width > window.innerWidth;

  return !(left < 0 || tooWide);
}

// Check if vertical position collides with edge of window
export function checkVerticalWindowCollision(
  contentElPos: RefPosition,
  top: number,
) {
  const tooTall = top + contentElPos.height > window.innerHeight;

  return !(top < 0 || tooTall);
}

// Constructs the transform origin for any given pair of alignment / justification
export function getTransformOrigin({
  alignment,
  justification,
}: AbstractPosition) {
  let x = '';
  let y = '';

  switch (alignment) {
    case Align.left:
      x = 'right';
      break;

    case Align.right:
      x = 'left';
      break;

    case Align.bottom:
      y = 'top';
      break;

    case Align.top:
      y = 'bottom';
      break;
  }

  switch (justification) {
    case Justification.left:
      x = 'left';
      break;

    case Justification.right:
      x = 'right';
      break;

    case Justification.bottom:
      y = 'top';
      break;

    case Justification.top:
      y = 'bottom';
      break;

    case Justification['center-horizontal']:
      x = 'center';
      break;

    case Justification['center-vertical']:
      y = 'center';
      break;
  }

  return `${x} ${y}`;
}

// Get transform styles for position object
export function getTransform(alignment: Align) {
  const transformAmount = 12;
  const scaleAmount = 0.8;

  switch (alignment) {
    case Align.top:
      return `translate3d(0, ${transformAmount}px, 0) scale(${scaleAmount})`;

    case Align.bottom:
      return `translate3d(0, -${transformAmount}px, 0) scale(${scaleAmount})`;

    case Align.left:
      return `translate3d(${transformAmount}px, 0, 0) scale(${scaleAmount})`;

    case Align.right:
      return `translate3d(-${transformAmount}px, 0, 0) scale(${scaleAmount})`;
  }
}

// Gets top offset, left offset, width and height dimensions for a node
export function getRefPosition(element: HTMLElement | null) {
  if (!element) {
    return defaultRefPosition;
  }

  const { top, bottom, left, right } = element.getBoundingClientRect();
  const { offsetHeight: height, offsetWidth: width } = element;

  return { top, bottom, left, right, height, width };
}

// Returns positioning for an element absolutely positioned within it's relative parent
export function calcPositionWithoutPortal(
  referenceElPos: RefPosition,
  contentElPos: RefPosition,
  { alignment, justification }: AbstractPosition,
) {
  const positionObject: AbsolutePositionObject = {};

  switch (alignment) {
    case Align.top:
      positionObject.bottom = '100%';
      break;

    case Align.bottom:
      positionObject.top = '100%';
      break;

    case Align.left:
      positionObject.right = '100%';
      break;

    case Align.right:
      positionObject.left = '100%';
      break;
  }

  switch (justification) {
    case Justification.top:
      positionObject.top = 0;
      break;

    case Justification.bottom:
      positionObject.bottom = 0;
      break;

    case Justification.left:
      positionObject.left = 0;
      break;

    case Justification.right:
      positionObject.right = 0;
      break;

    case Justification['center-horizontal']:
      positionObject.left = referenceElPos.width / 2 - contentElPos.width / 2;
      break;

    case Justification['center-vertical']:
      positionObject.top = referenceElPos.height / 2 - contentElPos.height / 2;
      break;
  }

  return positionObject;
}
