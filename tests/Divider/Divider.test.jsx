import { render } from '@testing-library/react';
import * as React from 'react';
import { Divider } from '../../src';

describe('Divider', () => {
  it('renders as an hr with role=separator', () => {
    const { getByRole } = render(<Divider data-testid="test" />);
    expect(getByRole('separator')).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('applies vertical orientation styling', () => {
    const { getByRole } = render(<Divider orientation="vertical" />);
    const el = getByRole('separator');
    expect(el).toHaveAttribute('aria-orientation', 'vertical');
    expect(el.style.width).toEqual('0px');
  });

  it('varies border width by thickness', () => {
    const { getByRole } = render(<Divider thickness="thicker" />);
    expect(getByRole('separator').style.borderTopWidth).toEqual('4px');
  });
});
