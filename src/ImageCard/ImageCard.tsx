import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';

import Card from '../Card/Card';
import { CardBody, CardTitle, CardSubtitle, CardText, CardFooter } from '../Card/CardMisc';
import { BsPrefixProps } from '../utils/helpers';

export type ImageCardImagePosition = 'before' | 'after';

export interface ImageCardProps extends BsPrefixProps, Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** The card's image, e.g. `<img src="..." alt="..." />`. */
  image?: React.ReactNode;
  /** Where the image sits relative to the body content. */
  imagePosition?: ImageCardImagePosition;
  /** A badge overlaid at the image's top-left corner. */
  imageBadge?: React.ReactNode;
  /** An action/overflow menu overlaid at the image's top-right corner. */
  imageAction?: React.ReactNode;
  /** Content displayed above the subtitle (badges, status indicators). */
  upper?: React.ReactNode;
  /** The card's title. */
  title?: React.ReactNode;
  /** The card's subtitle, rendered under the title. */
  subtitle?: React.ReactNode;
  /** The card's body/description text. */
  description?: React.ReactNode;
  /** Content displayed below the description (badges, metadata). */
  lower?: React.ReactNode;
  /** Footer content -- links, actions. */
  footer?: React.ReactNode;
  /** Removes the card body's padding. */
  noPadding?: boolean;
}

const propTypes = {
  image: PropTypes.node,
  imagePosition: PropTypes.oneOf(['before', 'after']),
  imageBadge: PropTypes.node,
  imageAction: PropTypes.node,
  upper: PropTypes.node,
  title: PropTypes.node,
  subtitle: PropTypes.node,
  description: PropTypes.node,
  lower: PropTypes.node,
  footer: PropTypes.node,
  noPadding: PropTypes.bool,
};

const defaultProps = {
  imagePosition: 'before' as ImageCardImagePosition,
  noPadding: false,
};

/**
 * An image-led content card. Composes this package's existing `Card`/
 * `Card.Img`/`Card.Body`/`Card.Title`/`Card.Subtitle`/`Card.Text`/
 * `Card.Footer` primitives (not a reimplementation), adding sit-image-card's
 * own slot shape (image/image-badge/image-action/upper/title/subtitle/
 * description/lower/footer) on top.
 */
export const ImageCard = React.forwardRef<HTMLElement, ImageCardProps>(
  (
    {
      image,
      imagePosition = 'before',
      imageBadge,
      imageAction,
      upper,
      title,
      subtitle,
      description,
      lower,
      footer,
      className,
      noPadding,
      children,
      ...props
    },
    ref,
  ) => {
    // Bootstrap's real card-img-top/-bottom classes clip the image to the
    // card's own corner radius, and need to land on the image/svg element
    // itself (not a wrapping div) -- cloned in here so `image` can stay a
    // flexible ReactNode (an <img> or an <svg>, matching sit-image-card's
    // own "any image or svg element" slot) rather than a dedicated prop
    // shape this component would have to re-validate.
    const imgClass = imagePosition === 'before' ? 'card-img-top' : 'card-img-bottom';
    const clonedImage =
      image && React.isValidElement(image)
        ? React.cloneElement(image, {
            className: classNames((image.props as any).className, imgClass),
          } as any)
        : image;

    const imageBlock = image && (
      <div className="image-card-image-wrapper position-relative">
        {clonedImage}
        {imageBadge && <div className="position-absolute top-0 start-0 m-2">{imageBadge}</div>}
        {imageAction && <div className="position-absolute top-0 end-0 m-2">{imageAction}</div>}
      </div>
    );

    return (
      <Card ref={ref} className={classNames(className)} {...props}>
        {imagePosition === 'before' && imageBlock}
        <CardBody className={noPadding ? 'p-0' : undefined}>
          {upper && <div className="image-card-upper mb-1">{upper}</div>}
          {title && <CardTitle>{title}</CardTitle>}
          {subtitle && <CardSubtitle className="mb-2 text-muted">{subtitle}</CardSubtitle>}
          {description && <CardText>{description}</CardText>}
          {children}
          {lower && <div className="image-card-lower mt-2">{lower}</div>}
        </CardBody>
        {imagePosition === 'after' && imageBlock}
        {footer && <CardFooter>{footer}</CardFooter>}
      </Card>
    );
  },
);

ImageCard.displayName = 'ImageCard';
ImageCard.propTypes = propTypes as any;
ImageCard.defaultProps = defaultProps;

export default ImageCard;
