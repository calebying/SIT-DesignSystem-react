import { render } from '@testing-library/react';
import * as React from 'react';
import { Mainnav, Nav } from '../../src';

describe('Mainnav', () => {
  it('renders brand, nav items, and a toggle button', () => {
    const { getByText, container } = render(
      <Mainnav brand="SIT" brandHref="#" data-testid="test">
        <Nav.Item>
          <Nav.Link href="#">Home</Nav.Link>
        </Nav.Item>
      </Mainnav>,
    );
    expect(getByText('SIT')).not.toBeNull();
    expect(getByText('Home')).not.toBeNull();
    expect(container.querySelector('.navbar-toggler')).not.toBeNull();
  });

  it('renders end and non-collapsible slot content', () => {
    const { getByText } = render(
      <Mainnav end={<span>End content</span>} nonCollapsible={<span>Always visible</span>}>
        <Nav.Item>
          <Nav.Link href="#">Home</Nav.Link>
        </Nav.Item>
      </Mainnav>,
    );
    expect(getByText('End content')).not.toBeNull();
    expect(getByText('Always visible')).not.toBeNull();
  });
});
