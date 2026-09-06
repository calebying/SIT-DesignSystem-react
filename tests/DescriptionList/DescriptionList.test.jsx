import { render } from '@testing-library/react';
import * as React from 'react';
import { DescriptionList } from '../../src';

describe('DescriptionList', () => {
  it('renders the first child as label, the rest as data', () => {
    const { getByText } = render(
      <DescriptionList>
        Name
        <span>Jane Tan</span>
      </DescriptionList>,
    );
    expect(getByText('Name')).not.toBeNull();
    expect(getByText('Jane Tan')).not.toBeNull();
  });

  it('DescriptionList.Group renders a title and description above its items', () => {
    const { getByText } = render(
      <DescriptionList.Group title="Contact details" description="How to reach them">
        <DescriptionList>
          Email
          <span>jane@example.com</span>
        </DescriptionList>
      </DescriptionList.Group>,
    );
    expect(getByText('Contact details')).not.toBeNull();
    expect(getByText('How to reach them')).not.toBeNull();
    expect(getByText('Email')).not.toBeNull();
  });

  it('Group passes stacked/bordered down to child items that do not set their own', () => {
    const { container } = render(
      <DescriptionList.Group stacked bordered>
        <DescriptionList data-testid="item">
          Name
          <span>Jane Tan</span>
        </DescriptionList>
      </DescriptionList.Group>,
    );
    const item = container.querySelector('[data-testid="item"]');
    expect(item.classList).toContain('flex-column');
    expect(item.classList).toContain('border-bottom');
  });
});
