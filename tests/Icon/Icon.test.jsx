import { render } from '@testing-library/react';
import * as React from 'react';
import { Icon } from '../../src';

describe('Icon', () => {
  it('renders the bi and bi-{name} classes', () => {
    const { getByTestId } = render(<Icon name="check-circle" data-testid="test" />);
    const icon = getByTestId('test');
    expect(icon.classList).toContain('bi');
    expect(icon.classList).toContain('bi-check-circle');
    expect(icon.tagName.toLowerCase()).toEqual('i');
  });

  it('is aria-hidden when no ariaLabel is given', () => {
    const { getByTestId } = render(<Icon name="check-circle" data-testid="test" />);
    const icon = getByTestId('test');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
    expect(icon).not.toHaveAttribute('aria-label');
  });

  it('is labelled, not hidden, when ariaLabel is given', () => {
    const { getByTestId } = render(
      <Icon name="check-circle" ariaLabel="Success" data-testid="test" />,
    );
    const icon = getByTestId('test');
    expect(icon).not.toHaveAttribute('aria-hidden');
    expect(icon).toHaveAttribute('aria-label', 'Success');
  });

  it('applies a font-size matching the requested size', () => {
    const { getByTestId } = render(<Icon name="check-circle" size="xl" data-testid="test" />);
    const icon = getByTestId('test');
    expect(icon.style.fontSize).toEqual('2rem');
  });

  it('supports custom `as`', () => {
    const { getByTestId } = render(<Icon as="span" name="check-circle" data-testid="test" />);
    const icon = getByTestId('test');
    expect(icon.tagName.toLowerCase()).toEqual('span');
  });
});
