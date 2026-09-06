import { render } from '@testing-library/react';
import * as React from 'react';
import { Textarea } from '../../src';

describe('Textarea', () => {
  it('renders a textarea element', () => {
    const { getByTestId } = render(<Textarea data-testid="test" />);
    expect(getByTestId('test').tagName.toLowerCase()).toEqual('textarea');
  });

  it('forwards the rows prop', () => {
    const { getByTestId } = render(<Textarea rows={6} data-testid="test" />);
    expect(getByTestId('test')).toHaveAttribute('rows', '6');
  });
});
