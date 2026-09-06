import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';

import { useBootstrapPrefix, CanvasWrapper } from '../ThemeProvider/ThemeProvider';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from '../utils/helpers';

export type SkeletonAnimation = 'glow' | 'wave' | 'none';
export type SkeletonSize = 'xs' | 'sm' | 'lg';

export interface SkeletonProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {
  /** Width of the skeleton (any valid CSS length, e.g. "100%" or "240px"). */
  width?: string | number;
  /** Height of the skeleton (any valid CSS length). */
  height?: string | number;
  /** Border radius of the skeleton (any valid CSS length). */
  borderRadius?: string | number;
  /** Number of placeholder rows/lines. Defaults to a single row. */
  rows?: number;
  /** The loading animation. Maps to Bootstrap's real `.placeholder-glow`/`.placeholder-wave` classes -- see https://getbootstrap.com/docs/5.2/components/placeholders/ */
  animation?: SkeletonAnimation;
  /** Height tier, mirroring Bootstrap's real `.placeholder-{size}` classes. */
  size?: SkeletonSize;
}

const propTypes = {
  /** @default 'placeholder' */
  bsPrefix: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  rows: PropTypes.number,
  animation: PropTypes.oneOf(['glow', 'wave', 'none']),
  size: PropTypes.oneOf(['xs', 'sm', 'lg']),
  as: PropTypes.elementType,
};

const defaultProps = {
  animation: 'glow' as SkeletonAnimation,
  rows: 1,
};

export const Skeleton: BsPrefixRefForwardingComponent<'div', SkeletonProps> =
  React.forwardRef<HTMLElement, SkeletonProps>(
    (
      {
        bsPrefix,
        width,
        height,
        borderRadius,
        rows = 1,
        animation = 'glow',
        size,
        className,
        style,
        as: Component = 'div',
        ...props
      },
      ref,
    ) => {
      const prefix = useBootstrapPrefix(bsPrefix, 'placeholder');
      const itemStyle: React.CSSProperties = { width, height, borderRadius };

      return (
        <CanvasWrapper
          as={Component}
          ref={ref}
          {...props}
          style={style}
          className={classNames(
            className,
            animation !== 'none' && `placeholder-${animation}`,
            rows > 1 && 'd-flex flex-column gap-2',
          )}
        >
          {Array.from({ length: rows }).map((_, i) => (
            <span
              key={i}
              className={classNames(
                prefix,
                size && `${prefix}-${size}`,
                rows > 1 && 'd-block w-100',
              )}
              style={itemStyle}
            />
          ))}
        </CanvasWrapper>
      );
    },
  );

Skeleton.displayName = 'Skeleton';
Skeleton.propTypes = propTypes;
Skeleton.defaultProps = defaultProps;

export default Skeleton;
