import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';

import { useBootstrapPrefix, CanvasWrapper } from '../ThemeProvider/ThemeProvider';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from '../utils/helpers';
import { Variant } from '../utils/types';

export type SpinnerAnimation = 'border' | 'grow';

export interface SpinnerProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {
  /** The visual animation style. Maps to Bootstrap's real `.spinner-border`/`.spinner-grow` classes -- see https://getbootstrap.com/docs/5.2/components/spinners/ */
  animation?: SpinnerAnimation;
  /** Text colour of the spinner. */
  variant?: Variant;
  /** Smaller spinner. */
  size?: 'sm';
  /** Visually-hidden accessible label. */
  label?: string;
}

const propTypes = {
  /** @default 'spinner' */
  bsPrefix: PropTypes.string,
  animation: PropTypes.oneOf(['border', 'grow']),
  variant: PropTypes.string,
  size: PropTypes.oneOf(['sm']),
  label: PropTypes.string,
  as: PropTypes.elementType,
};

const defaultProps = {
  animation: 'border' as SpinnerAnimation,
  label: 'Loading...',
};

export const Spinner: BsPrefixRefForwardingComponent<'div', SpinnerProps> =
  React.forwardRef<HTMLElement, SpinnerProps>(
    (
      {
        bsPrefix,
        animation = 'border',
        variant,
        size,
        label = 'Loading...',
        className,
        as: Component = 'div',
        ...props
      },
      ref,
    ) => {
      const prefix = useBootstrapPrefix(bsPrefix, 'spinner');
      const bsPrefixWithAnimation = `${prefix}-${animation}`;
      return (
        <CanvasWrapper
          as={Component}
          ref={ref}
          {...props}
          role="status"
          className={classNames(
            className,
            bsPrefixWithAnimation,
            size && `${bsPrefixWithAnimation}-${size}`,
            variant && `text-${variant}`,
          )}
        >
          {label && <span className="visually-hidden">{label}</span>}
        </CanvasWrapper>
      );
    },
  );

Spinner.displayName = 'Spinner';
Spinner.propTypes = propTypes;
Spinner.defaultProps = defaultProps;

export default Spinner;
