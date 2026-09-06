import { render, fireEvent } from '@testing-library/react';
import * as React from 'react';
import { SystemBanner } from '../../src';

describe('SystemBanner', () => {
  it('renders its content by default', () => {
    const { getByText } = render(<SystemBanner>Scheduled maintenance tonight.</SystemBanner>);
    expect(getByText('Scheduled maintenance tonight.')).not.toBeNull();
  });

  it('does not render when show is false', () => {
    const { queryByText } = render(<SystemBanner show={false}>Hidden</SystemBanner>);
    expect(queryByText('Hidden')).toBeNull();
  });

  it('calls onClose with false when the close button is clicked', () => {
    const onClose = jest.fn();
    const { getByLabelText } = render(
      <SystemBanner dismissible onClose={onClose}>
        Notice
      </SystemBanner>,
    );
    fireEvent.click(getByLabelText('Close banner'));
    expect(onClose).toHaveBeenCalledWith(false, expect.anything());
  });

  it('does not render a close button when dismissible is false', () => {
    const { queryByLabelText } = render(<SystemBanner>Notice</SystemBanner>);
    expect(queryByLabelText('Close banner')).toBeNull();
  });
});
