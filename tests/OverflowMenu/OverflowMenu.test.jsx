import { render, fireEvent } from '@testing-library/react';
import * as React from 'react';
import { OverflowMenu, Dropdown } from '../../src';

describe('OverflowMenu', () => {
  it('renders a toggle button with the given aria-label', () => {
    const { getByLabelText } = render(
      <OverflowMenu ariaLabel="Row actions">
        <Dropdown.Item>Edit</Dropdown.Item>
      </OverflowMenu>,
    );
    expect(getByLabelText('Row actions')).not.toBeNull();
  });

  it('reveals its menu items on toggle click', () => {
    const { getByLabelText, getByText } = render(
      <OverflowMenu ariaLabel="Row actions">
        <Dropdown.Item>Edit</Dropdown.Item>
        <Dropdown.Item>Delete</Dropdown.Item>
      </OverflowMenu>,
    );
    fireEvent.click(getByLabelText('Row actions'));
    expect(getByText('Edit')).not.toBeNull();
    expect(getByText('Delete')).not.toBeNull();
  });
});
