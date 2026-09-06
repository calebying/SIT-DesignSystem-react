import { render, fireEvent } from '@testing-library/react';
import * as React from 'react';
import { Checkbox } from '../../src';

describe('Checkbox', () => {
  it('renders a checkbox input with a label', () => {
    const { getByLabelText } = render(<Checkbox label="Subscribe" id="subscribe" />);
    const checkbox = getByLabelText('Subscribe');
    expect(checkbox).toHaveAttribute('type', 'checkbox');
  });

  it('toggles when clicked', () => {
    const { getByLabelText } = render(<Checkbox label="Subscribe" id="subscribe" />);
    const checkbox = getByLabelText('Subscribe');
    expect(checkbox.checked).toBe(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });

  it('CheckboxGroup renders a legend and shares name across children', () => {
    const { getByText, getAllByRole } = render(
      <Checkbox.Group label="Interests" name="interests">
        <Checkbox label="Sports" value="sports" id="sports" />
        <Checkbox label="Music" value="music" id="music" />
      </Checkbox.Group>,
    );
    expect(getByText('Interests')).not.toBeNull();
    const checkboxes = getAllByRole('checkbox');
    expect(checkboxes[0]).toHaveAttribute('name', 'interests');
    expect(checkboxes[1]).toHaveAttribute('name', 'interests');
  });
});
