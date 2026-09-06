import { render, fireEvent } from '@testing-library/react';
import * as React from 'react';
import { Drawer } from '../../src';

describe('Drawer', () => {
  it('renders title, description, and content when open', () => {
    const { getByText } = render(
      <Drawer open title="Filters" description="Refine your results">
        Filter content
      </Drawer>,
    );
    expect(getByText('Filters')).not.toBeNull();
    expect(getByText('Refine your results')).not.toBeNull();
    expect(getByText('Filter content')).not.toBeNull();
  });

  it('applies the show class and offcanvas-{placement} class when open', () => {
    const { container } = render(
      <Drawer open placement="start">
        Content
      </Drawer>,
    );
    const drawer = container.querySelector('.offcanvas');
    expect(drawer.classList).toContain('show');
    expect(drawer.classList).toContain('offcanvas-start');
  });

  it('calls onClose with "close-button" when the close button is clicked', () => {
    const onClose = jest.fn();
    const { getByLabelText } = render(
      <Drawer open onClose={onClose}>
        Content
      </Drawer>,
    );
    fireEvent.click(getByLabelText('Close'));
    expect(onClose).toHaveBeenCalledWith('close-button');
  });

  it('calls onClose with "overlay" when the backdrop is clicked', () => {
    const onClose = jest.fn();
    const { container } = render(
      <Drawer open onClose={onClose}>
        Content
      </Drawer>,
    );
    fireEvent.click(container.querySelector('.offcanvas-backdrop'));
    expect(onClose).toHaveBeenCalledWith('overlay');
  });
});
