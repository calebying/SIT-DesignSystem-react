import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';

import { useBootstrapPrefix, CanvasWrapper } from '../ThemeProvider/ThemeProvider';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from '../utils/helpers';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerThickness = 'thin' | 'thick' | 'thicker';

const THICKNESS_PX: Record<DividerThickness, number> = {
  thin: 1,
  thick: 2,
  thicker: 4,
};

export interface DividerProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {
  orientation?: DividerOrientation;
  thickness?: DividerThickness;
}

const propTypes = {
  /** @default 'divider' */
  bsPrefix: PropTypes.string,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  thickness: PropTypes.oneOf(['thin', 'thick', 'thicker']),
  as: PropTypes.elementType,
};

const defaultProps = {
  orientation: 'horizontal' as DividerOrientation,
  thickness: 'thin' as DividerThickness,
};

export const Divider: BsPrefixRefForwardingComponent<'hr', DividerProps> =
  React.forwardRef<HTMLElement, DividerProps>(
    (
      {
        bsPrefix,
        orientation = 'horizontal',
        thickness = 'thin',
        className,
        style,
        as: Component = 'hr',
        ...props
      },
      ref,
    ) => {
      const prefix = useBootstrapPrefix(bsPrefix, 'divider');
      const px = THICKNESS_PX[thickness];
      const borderStyle: React.CSSProperties =
        orientation === 'vertical'
          ? { borderLeftWidth: px, height: '100%', width: 0 }
          : { borderTopWidth: px, width: '100%', height: 0 };

      return (
        <CanvasWrapper
          as={Component}
          ref={ref}
          {...props}
          role="separator"
          aria-orientation={orientation}
          className={classNames(className, prefix, `${prefix}-${orientation}`, 'm-0 border-0')}
          style={{
            ...borderStyle,
            borderStyle: 'solid',
            borderColor: 'var(--bs-border-color, #dee2e6)',
            display: orientation === 'vertical' ? 'inline-block' : 'block',
            ...style,
          }}
        />
      );
    },
  );

Divider.displayName = 'Divider';
Divider.propTypes = propTypes;
Divider.defaultProps = defaultProps;

export default Divider;
