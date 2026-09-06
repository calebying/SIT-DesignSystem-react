import { render, fireEvent } from '@testing-library/react';
import * as React from 'react';
import { Switch } from '../../src';

describe('Switch', () => {
  it('renders as a real re-export of Form/Switch, with the switch class', () => {
    const { getByLabelText } = render(<Switch label="Dark mode" id="dark-mode" />);
    const input = getByLabelText('Dark mode');
    expect(input).toHaveAttribute('type', 'checkbox');
    expect(input.closest('.form-check')).toHaveClass('form-switch');
  });

  it('toggles when clicked', () => {
    const { getByLabelText } = render(<Switch label="Dark mode" id="dark-mode" />);
    const input = getByLabelText('Dark mode');
    expect(input.checked).toBe(false);
    fireEvent.click(input);
    expect(input.checked).toBe(true);
  });
});
