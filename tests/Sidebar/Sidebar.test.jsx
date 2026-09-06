import { render } from '@testing-library/react';
import * as React from 'react';
import { Sidebar } from '../../src';

describe('Sidebar', () => {
  it('renders upper/lower slot content and nav items', () => {
    const { getByText } = render(
      <Sidebar upper={<span>Brand</span>} lower={<span>Footer</span>} data-testid="test">
        <Sidebar.Item eventKey="home">
          <Sidebar.Link href="#">Home</Sidebar.Link>
        </Sidebar.Item>
      </Sidebar>,
    );
    expect(getByText('Brand')).not.toBeNull();
    expect(getByText('Footer')).not.toBeNull();
    expect(getByText('Home')).not.toBeNull();
  });

  it('applies the collapsed and variant classes', () => {
    const { getByTestId } = render(<Sidebar collapsed variant="overlay" data-testid="test" />);
    const sidebar = getByTestId('test');
    expect(sidebar.classList).toContain('sidebar-collapsed');
    expect(sidebar.classList).toContain('sidebar-overlay');
  });

  it('has an accessible label defaulting to "Sidebar navigation"', () => {
    const { getByTestId } = render(<Sidebar data-testid="test" />);
    expect(getByTestId('test')).toHaveAttribute('aria-label', 'Sidebar navigation');
  });
});
