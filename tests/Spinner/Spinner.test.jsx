import { render } from '@testing-library/react';
import * as React from 'react';
import { Spinner } from '../../src';

describe('Spinner', () => {
  it('renders spinner-border by default with role=status and a visually-hidden label', () => {
    const { getByTestId, getByText } = render(<Spinner data-testid="test" />);
    const spinner = getByTestId('test');
    expect(spinner.classList).toContain('spinner-border');
    expect(spinner).toHaveAttribute('role', 'status');
    expect(getByText('Loading...')).toHaveClass('visually-hidden');
  });

  it('renders spinner-grow when animation="grow"', () => {
    const { getByTestId } = render(<Spinner animation="grow" data-testid="test" />);
    expect(getByTestId('test').classList).toContain('spinner-grow');
  });

  it('applies the size as a spinner-{animation}-{size} class', () => {
    const { getByTestId } = render(<Spinner size="sm" data-testid="test" />);
    expect(getByTestId('test').classList).toContain('spinner-border-sm');
  });

  it('applies variant as a text-{variant} class', () => {
    const { getByTestId } = render(<Spinner variant="danger" data-testid="test" />);
    expect(getByTestId('test').classList).toContain('text-danger');
  });

  it('uses a custom label', () => {
    const { getByText } = render(<Spinner label="Fetching results" />);
    expect(getByText('Fetching results')).not.toBeNull();
  });
});
