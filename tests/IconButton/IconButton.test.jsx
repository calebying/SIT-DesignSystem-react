import { render } from '@testing-library/react';
import * as React from 'react';
import { IconButton } from '../../src';

describe('IconButton', () => {
  it('renders a button with the btn-icon class and an icon', () => {
    const { getByTestId, container } = render(
      <IconButton name="trash" aria-label="Delete" data-testid="test" />,
    );
    const button = getByTestId('test');
    expect(button.tagName.toLowerCase()).toEqual('button');
    expect(button.classList).toContain('btn-icon');
    expect(button).toHaveAttribute('aria-label', 'Delete');
    expect(container.querySelector('.bi-trash')).not.toBeNull();
  });

  it('renders a spinner instead of the icon, and disables the button, when loading', () => {
    const { getByTestId, container } = render(
      <IconButton name="trash" aria-label="Delete" loading data-testid="test" />,
    );
    const button = getByTestId('test');
    expect(button).toBeDisabled();
    expect(container.querySelector('.spinner-border')).not.toBeNull();
    expect(container.querySelector('.bi-trash')).toBeNull();
  });

  it('passes through Button props like variant and size', () => {
    const { getByTestId } = render(
      <IconButton name="trash" aria-label="Delete" variant="danger" size="sm" data-testid="test" />,
    );
    const button = getByTestId('test');
    expect(button.classList).toContain('btn-danger');
    expect(button.classList).toContain('btn-sm');
  });
});
