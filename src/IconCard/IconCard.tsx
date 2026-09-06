import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';

import Card from '../Card/Card';
import { CardBody, CardTitle, CardSubtitle, CardText, CardFooter } from '../Card/CardMisc';
import { BsPrefixProps } from '../utils/helpers';

export interface IconCardProps extends BsPrefixProps, Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** The card's icon element, e.g. `<Icon name="check-circle" size="xl" />`. */
  icon?: React.ReactNode;
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
  icon: PropTypes.node,
  upper: PropTypes.node,
  title: PropTypes.node,
  subtitle: PropTypes.node,
  description: PropTypes.node,
  lower: PropTypes.node,
  footer: PropTypes.node,
  noPadding: PropTypes.bool,
};

const defaultProps = {
  noPadding: false,
};

/**
 * An icon-led content card. Composes this package's existing `Card`/
 * `Card.Body`/`Card.Title`/`Card.Subtitle`/`Card.Text`/`Card.Footer`
 * primitives (not a reimplementation), adding sit-icon-card's own slot shape
 * (icon/upper/title/subtitle/description/lower/footer) on top.
 */
export const IconCard = React.forwardRef<HTMLElement, IconCardProps>(
  ({ icon, upper, title, subtitle, description, lower, footer, className, noPadding, children, ...props }, ref) => {
    return (
      <Card ref={ref} className={classNames(className)} {...props}>
        <CardBody className={noPadding ? 'p-0' : undefined}>
          {icon && <div className="icon-card-icon mb-2">{icon}</div>}
          {upper && <div className="icon-card-upper mb-1">{upper}</div>}
          {title && <CardTitle>{title}</CardTitle>}
          {subtitle && <CardSubtitle className="mb-2 text-muted">{subtitle}</CardSubtitle>}
          {description && <CardText>{description}</CardText>}
          {children}
          {lower && <div className="icon-card-lower mt-2">{lower}</div>}
        </CardBody>
        {footer && <CardFooter>{footer}</CardFooter>}
      </Card>
    );
  },
);

IconCard.displayName = 'IconCard';
IconCard.propTypes = propTypes;
IconCard.defaultProps = defaultProps;

export default IconCard;
