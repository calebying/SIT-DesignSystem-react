import { render, fireEvent } from '@testing-library/react';
import * as React from 'react';
import { useState } from 'react';
import { Radio } from '../../src';

describe('Radio', () => {
  it('renders a radio input with a label', () => {
    const { getByLabelText } = render(<Radio label="Email" id="email" />);
    expect(getByLabelText('Email')).toHaveAttribute('type', 'radio');
  });

  it('RadioGroup shares a name and enforces mutual exclusivity via controlled value', () => {
    const RadioGroupHarness = () => {
      const [value, setValue] = useState('email');
      return (
        <Radio.Group label="Contact method" value={value} onChange={setValue}>
          <Radio label="Email" id="email" value="email" />
          <Radio label="Phone" id="phone" value="phone" />
        </Radio.Group>
      );
    };
    const { getByLabelText } = render(<RadioGroupHarness />);
    const email = getByLabelText('Email');
    const phone = getByLabelText('Phone');

    expect(email.checked).toBe(true);
    expect(phone.checked).toBe(false);
    expect(email.name).toEqual(phone.name);

    fireEvent.click(phone);
    expect(email.checked).toBe(false);
    expect(phone.checked).toBe(true);
  });

  it('RadioGroup auto-generates a shared name when none is given', () => {
    const { getByLabelText } = render(
      <Radio.Group label="Contact method">
        <Radio label="Email" id="email" value="email" />
        <Radio label="Phone" id="phone" value="phone" />
      </Radio.Group>,
    );
    const email = getByLabelText('Email');
    const phone = getByLabelText('Phone');
    expect(email.name).toEqual(phone.name);
    expect(email.name).not.toEqual('');
  });
});
