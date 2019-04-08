export const getParentBox = parent => {
  if (parent) {
    const scrollOffset = getScrollOffsets();
    const box = parent.getBoundingClientRect();
    const top = Math.round(box.top + scrollOffset.y);
    const left = Math.round(box.left + scrollOffset.x);
    return {
      top,
      left,
      bottom: top + parent.offsetHeight,
      right: left + parent.offsetWidth,
    };
  }
};

export const getScrollOffsets = () => {
  const doc = document,
    win = window;

  if (typeof win.scrollY !== undefined) {
    return {
      x: win.scrollX,
      y: win.scrollY,
    };
  } else if (typeof win.pageYOffset === 'number') {
    return {
      x: win.pageXOffset,
      y: win.pageYOffset,
    };
  }

  const docEl =
    doc.compatMode === 'CSS1Compat' ? doc.documentElement : doc.body;

  return {
    x: docEl.scrollLeft,
    y: docEl.scrollTop,
  };
};

export const positionMenu = (alignment = 'right', parent) => {
  const parentBox = getParentBox(parent);

  if (parentBox) {
    const scrollY = window.scrollY;

    let style;
    if (alignment === 'left') {
      style = {
        left: parentBox.left,
        top: `${parentBox.bottom - scrollY}px`,
        transformOrigin: 'top left',
      };
    } else if (alignment === 'right') {
      style = {
        right: window.innerWidth - parentBox.right,
        top: `${parentBox.bottom - scrollY + 8}px`,
        transformOrigin: 'top right',
      };
    }
    return style;
  }
};
