import { render, fireEvent } from '@testing-library/react';
import * as React from 'react';
import { Subnav, Nav } from '../../src';

describe('Subnav', () => {
  it('renders header, actions, and nav items', () => {
    const { getByText } = render(
      <Subnav header="Section title" actions={<button type="button">Filter</button>}>
        <Nav.Item>
          <Nav.Link href="#">Overview</Nav.Link>
        </Nav.Item>
      </Subnav>,
    );
    expect(getByText('Section title')).not.toBeNull();
    expect(getByText('Filter')).not.toBeNull();
    expect(getByText('Overview')).not.toBeNull();
  });

  it('toggles the collapsed nav region on small screens via the toggle button', () => {
    const { getByLabelText, getByText } = render(
      <Subnav header="Section title">
        <Nav.Item>
          <Nav.Link href="#">Overview</Nav.Link>
        </Nav.Item>
      </Subnav>,
    );
    const toggle = getByLabelText('Toggle sub-navigation');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
  });
});
