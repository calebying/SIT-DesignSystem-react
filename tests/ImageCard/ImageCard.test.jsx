import { render } from '@testing-library/react';
import * as React from 'react';
import { ImageCard } from '../../src';

describe('ImageCard', () => {
  it('renders the image with a card-img-top class by default', () => {
    const { container } = render(
      <ImageCard image={<img src="a.jpg" alt="A course" />} title="Course A" />,
    );
    const img = container.querySelector('img');
    expect(img.classList).toContain('card-img-top');
  });

  it('uses card-img-bottom when imagePosition="after"', () => {
    const { container } = render(
      <ImageCard image={<img src="a.jpg" alt="A course" />} imagePosition="after" title="Course A" />,
    );
    const img = container.querySelector('img');
    expect(img.classList).toContain('card-img-bottom');
  });

  it('renders image-badge and image-action overlays', () => {
    const { getByText } = render(
      <ImageCard
        image={<img src="a.jpg" alt="A course" />}
        imageBadge={<span>New</span>}
        imageAction={<span>...</span>}
        title="Course A"
      />,
    );
    expect(getByText('New')).not.toBeNull();
    expect(getByText('...')).not.toBeNull();
  });
});
