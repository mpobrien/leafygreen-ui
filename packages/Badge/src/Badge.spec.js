import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Badge from './Badge';

afterAll(cleanup);

describe('packages/Badge', () => {
  const onClick = jest.fn();
  const className = 'test-pill-class';
  const child = 'Bubble Pill';

  const { container } = render(
    <Badge className={className} onClick={onClick}>
      {child}
    </Badge>,
  );

  const badge = container.firstChild;
  test(`renders "${className}" in the button's classList`, () => {
    expect(badge.classList.contains(className)).toBe(true);
  });

  test(`renders "${child}" as the button's textContent`, () => {
    expect(badge.textContent).toBe(child);
  });
});
