import { render } from '@testing-library/react';
import * as React from 'react';
import { Skeleton } from '../../src';

describe('Skeleton', () => {
  it('renders a single placeholder by default', () => {
    const { getByTestId, container } = render(<Skeleton data-testid="test" />);
    const wrapper = getByTestId('test');
    expect(wrapper.classList).toContain('placeholder-glow');
    expect(container.querySelectorAll('.placeholder').length).toEqual(1);
  });

  it('renders `rows` placeholders when rows > 1', () => {
    const { container } = render(<Skeleton rows={3} data-testid="test" />);
    expect(container.querySelectorAll('.placeholder').length).toEqual(3);
  });

  it('applies width/height/borderRadius via inline style', () => {
    const { container } = render(
      <Skeleton width="100px" height="20px" borderRadius="4px" data-testid="test" />,
    );
    const placeholder = container.querySelector('.placeholder');
    expect(placeholder.style.width).toEqual('100px');
    expect(placeholder.style.height).toEqual('20px');
    expect(placeholder.style.borderRadius).toEqual('4px');
  });

  it('omits the animation class when animation="none"', () => {
    const { getByTestId } = render(<Skeleton animation="none" data-testid="test" />);
    const wrapper = getByTestId('test');
    expect(wrapper.classList).not.toContain('placeholder-glow');
    expect(wrapper.classList).not.toContain('placeholder-wave');
  });

  it('applies the size as a placeholder-{size} class', () => {
    const { container } = render(<Skeleton size="lg" data-testid="test" />);
    expect(container.querySelector('.placeholder').classList).toContain('placeholder-lg');
  });
});
