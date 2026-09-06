import { render } from '@testing-library/react';
import * as React from 'react';
import { IconCard, Icon } from '../../src';

describe('IconCard', () => {
  it('renders icon, title, subtitle, description and footer', () => {
    const { getByText, container } = render(
      <IconCard
        icon={<Icon name="check-circle" size="xl" />}
        title="Compliance"
        subtitle="Up to date"
        description="All checks passed."
        footer={<span>View report</span>}
      />,
    );
    expect(container.querySelector('.bi-check-circle')).not.toBeNull();
    expect(getByText('Compliance')).not.toBeNull();
    expect(getByText('Up to date')).not.toBeNull();
    expect(getByText('All checks passed.')).not.toBeNull();
    expect(getByText('View report')).not.toBeNull();
  });

  it('renders inside a real Card (has the card class)', () => {
    const { container } = render(<IconCard title="Compliance" data-testid="test" />);
    expect(container.querySelector('.card')).not.toBeNull();
  });
});
