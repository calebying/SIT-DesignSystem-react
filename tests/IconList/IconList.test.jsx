import { render } from '@testing-library/react';
import * as React from 'react';
import { IconList, Icon } from '../../src';

describe('IconList', () => {
  it('renders items with role=list/listitem and an icon per item', () => {
    const { getByRole, getAllByRole, container } = render(
      <IconList>
        <IconList.Item icon={<Icon name="check-circle" />}>First</IconList.Item>
        <IconList.Item icon={<Icon name="check-circle" />}>Second</IconList.Item>
      </IconList>,
    );
    expect(getByRole('list')).not.toBeNull();
    expect(getAllByRole('listitem')).toHaveLength(2);
    expect(container.querySelectorAll('.bi-check-circle')).toHaveLength(2);
  });

  it('applies the size as an icon-list-{size} class', () => {
    const { getByRole } = render(<IconList size="lg" />);
    expect(getByRole('list').classList).toContain('icon-list-lg');
  });
});
