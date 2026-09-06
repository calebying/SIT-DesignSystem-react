import { render, fireEvent } from '@testing-library/react';
import * as React from 'react';
import { useState } from 'react';
import { Select } from '../../src';

describe('Select', () => {
  it('shows the placeholder when no value is selected', () => {
    const { getByText } = render(
      <Select placeholder="Choose one">
        <Select.Option value="a">Option A</Select.Option>
      </Select>,
    );
    expect(getByText('Choose one')).not.toBeNull();
  });

  it('shows the selected option label when value matches an option', () => {
    const { getByText } = render(
      <Select value="a">
        <Select.Option value="a">Option A</Select.Option>
        <Select.Option value="b">Option B</Select.Option>
      </Select>,
    );
    expect(getByText('Option A')).not.toBeNull();
  });

  it('uses role=combobox on the toggle and role=listbox/option on the menu, once open', () => {
    // DropdownMenu only renders its contents while the dropdown is open, so
    // the toggle must actually be clicked first -- role=listbox/option
    // don't exist in the DOM at all until then.
    const { getByRole, getAllByRole } = render(
      <Select value="a">
        <Select.Option value="a">Option A</Select.Option>
        <Select.Option value="b">Option B</Select.Option>
      </Select>,
    );
    expect(getByRole('combobox')).not.toBeNull();
    fireEvent.click(getByRole('combobox'));
    expect(getByRole('listbox')).not.toBeNull();
    expect(getAllByRole('option')).toHaveLength(2);
  });

  it('calls onChange and closes the menu when an option is clicked', () => {
    const SelectHarness = () => {
      const [value, setValue] = useState('a');
      return (
        <Select value={value} onChange={setValue}>
          <Select.Option value="a">Option A</Select.Option>
          <Select.Option value="b">Option B</Select.Option>
        </Select>
      );
    };
    const { getByRole, getAllByText } = render(<SelectHarness />);
    const toggle = getByRole('combobox');
    fireEvent.click(toggle);
    // "Option B" appears twice once open: inside the menu item, and (after
    // selection) inside the toggle's own label span -- disambiguate rather
    // than assume there's only one match.
    fireEvent.click(getAllByText('Option B')[0]);
    expect(toggle).toHaveTextContent('Option B');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('marks the selected option with aria-selected=true', () => {
    const { getByRole, getAllByRole } = render(
      <Select value="a">
        <Select.Option value="a">Option A</Select.Option>
        <Select.Option value="b">Option B</Select.Option>
      </Select>,
    );
    fireEvent.click(getByRole('combobox'));
    const options = getAllByRole('option');
    expect(options[0]).toHaveAttribute('aria-selected', 'true');
    expect(options[1]).toHaveAttribute('aria-selected', 'false');
  });
});
