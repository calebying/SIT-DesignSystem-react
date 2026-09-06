import { render } from '@testing-library/react';
import * as React from 'react';
import { TableOfContents } from '../../src';

describe('TableOfContents', () => {
  it('renders a header and item links', () => {
    const { getByText, getByRole } = render(
      <TableOfContents header="On this page">
        <TableOfContents.Item href="#intro">Introduction</TableOfContents.Item>
        <TableOfContents.Item href="#usage" active>
          Usage
        </TableOfContents.Item>
      </TableOfContents>,
    );
    expect(getByText('On this page')).not.toBeNull();
    expect(getByRole('link', { name: 'Introduction' })).toHaveAttribute('href', '#intro');
    expect(getByRole('link', { name: 'Usage' }).classList).toContain('fw-bold');
  });

  it('uses the header text as the accessible label when it is a string', () => {
    const { getByRole } = render(<TableOfContents header="On this page" />);
    expect(getByRole('navigation')).toHaveAttribute('aria-label', 'On this page');
  });
});
