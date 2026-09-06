import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';

import { useBootstrapPrefix, CanvasWrapper } from '../ThemeProvider/ThemeProvider';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from '../utils/helpers';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2-xl' | '3-xl';

// Mirrors the size-tier convention shared by this design system's other
// primitives (sit-icon, sit-spinner in the web-component package). This
// package has no CSS of its own backing a size-class scale (styles come
// from the separate @sit-canvas/canvas-css package), so sizes are applied
// as an inline font-size rather than invented utility classes with no
// stylesheet behind them.
const ICON_SIZE_REM: Record<IconSize, string> = {
  xs: '0.75rem',
  sm: '1rem',
  md: '1.25rem',
  lg: '1.5rem',
  xl: '2rem',
  '2-xl': '2.5rem',
  '3-xl': '3rem',
};

export interface IconProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {
  /** The bootstrap-icons icon name (without the `bi-` prefix), e.g. `"check-circle"`. See https://icons.getbootstrap.com/ */
  name: string;
  /** Icon size. */
  size?: IconSize;
  /** An accessible label for the icon. When set, the icon is treated as informative. When omitted, it is marked decorative with aria-hidden. */
  ariaLabel?: string;
}

const propTypes = {
  /** @default 'bi' */
  bsPrefix: PropTypes.string,
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2-xl', '3-xl']),
  ariaLabel: PropTypes.string,
  as: PropTypes.elementType,
};

const defaultProps = {
  size: 'md' as IconSize,
};

export const Icon: BsPrefixRefForwardingComponent<'i', IconProps> =
  React.forwardRef<HTMLElement, IconProps>(
    (
      { bsPrefix, name, size = 'md', ariaLabel, className, style, as: Component = 'i', ...props },
      ref,
    ) => {
      const prefix = useBootstrapPrefix(bsPrefix, 'bi');
      return (
        <CanvasWrapper
          as={Component}
          ref={ref}
          {...props}
          className={classNames(className, prefix, `bi-${name}`)}
          style={{ fontSize: ICON_SIZE_REM[size], ...style }}
          aria-hidden={ariaLabel ? undefined : true}
          aria-label={ariaLabel}
        />
      );
    },
  );

Icon.displayName = 'Icon';
Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default Icon;
