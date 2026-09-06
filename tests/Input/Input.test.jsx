import { render, fireEvent } from '@testing-library/react';
import * as React from 'react';
import { Input } from '../../src';

describe('Input', () => {
  it('renders a text input by default', () => {
    const { getByTestId } = render(<Input data-testid="test" />);
    const input = getByTestId('test');
    expect(input.tagName.toLowerCase()).toEqual('input');
  });

  it('forwards value changes via onChange', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(<Input data-testid="test" onChange={onChange} />);
    fireEvent.change(getByTestId('test'), { target: { value: 'hello' } });
    expect(onChange).toHaveBeenCalled();
  });

  it('applies size classes', () => {
    const { getByTestId } = render(<Input size="sm" data-testid="test" />);
    expect(getByTestId('test').classList).toContain('form-control-sm');
  });
});
