import { render, fireEvent } from '@testing-library/react';
import * as React from 'react';
import { Masthead } from '../../src';

describe('Masthead', () => {
  it('renders the government agency label', () => {
    const { getByText } = render(<Masthead />);
    expect(getByText('A Singapore Government Agency Website')).not.toBeNull();
  });

  it('toggles the identify panel on click', () => {
    const { getByText, queryByText } = render(<Masthead />);
    expect(queryByText(/Official website links end with/)).toBeNull();

    fireEvent.click(getByText('How to identify'));
    expect(getByText(/Official website links end with/)).not.toBeNull();

    fireEvent.click(getByText('How to identify'));
    expect(queryByText(/Official website links end with/)).toBeNull();
  });

  it('uses container-fluid when fluid is set', () => {
    const { container } = render(<Masthead fluid />);
    expect(container.querySelector('.container-fluid')).not.toBeNull();
  });
});
