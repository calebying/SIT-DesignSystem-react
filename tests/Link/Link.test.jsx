import { render } from '@testing-library/react';
import * as React from 'react';
import { Link } from '../../src';

describe('Link', () => {
  it('renders an anchor with the link class and href', () => {
    const { getByTestId } = render(
      <Link href="#" data-testid="test">
        Go
      </Link>,
    );
    const link = getByTestId('test');
    expect(link.tagName.toLowerCase()).toEqual('a');
    expect(link.classList).toContain('link');
    expect(link).toHaveAttribute('href', '#');
  });

  it('applies the tone as a text-{tone} class', () => {
    const { getByTestId } = render(
      <Link href="#" tone="danger" data-testid="test">
        Go
      </Link>,
    );
    expect(getByTestId('test').classList).toContain('text-danger');
  });

  it('applies the size as a link-{size} class', () => {
    const { getByTestId } = render(
      <Link href="#" size="lg" data-testid="test">
        Go
      </Link>,
    );
    expect(getByTestId('test').classList).toContain('link-lg');
  });

  it('strips href and removes from tab order when disabled', () => {
    const { getByTestId } = render(
      <Link href="#" disabled data-testid="test">
        Go
      </Link>,
    );
    const link = getByTestId('test');
    expect(link).not.toHaveAttribute('href');
    expect(link).toHaveAttribute('tabindex', '-1');
    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link.classList).toContain('disabled');
  });
});
