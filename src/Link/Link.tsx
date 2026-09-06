import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';

import { useBootstrapPrefix, CanvasWrapper } from '../ThemeProvider/ThemeProvider';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from '../utils/helpers';

export type LinkTone = 'primary' | 'danger' | 'neutral' | 'fixed-light' | 'fixed-dark';
export type LinkSize = 'xs' | 'sm' | 'md' | 'lg';

export interface LinkProps
  extends BsPrefixProps,
    React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Link size. */
  size?: LinkSize;
  /** Link colour tone. Mirrors sit-link's `tone` prop in the web-component package. */
  tone?: LinkTone;
  /** Manually set the visual state of the link to active. */
  active?: boolean;
  /** Disables the link -- removes it from the tab order and strips its href. */
  disabled?: boolean;
}

const propTypes = {
  /** @default 'link' */
  bsPrefix: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  tone: PropTypes.oneOf(['primary', 'danger', 'neutral', 'fixed-light', 'fixed-dark']),
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  as: PropTypes.elementType,
};

const defaultProps = {
  size: 'md' as LinkSize,
  tone: 'primary' as LinkTone,
  active: false,
  disabled: false,
};

export const Link: BsPrefixRefForwardingComponent<'a', LinkProps> =
  React.forwardRef<HTMLAnchorElement, LinkProps>(
    (
      {
        bsPrefix,
        size,
        tone,
        active,
        disabled,
        className,
        href,
        as: Component = 'a',
        ...props
      },
      ref,
    ) => {
      const prefix = useBootstrapPrefix(bsPrefix, 'link');
      // CanvasWrapper's own prop type is HTMLAttributes-based (no `href`),
      // since it renders through a runtime-resolved `as` it cannot narrow to
      // AnchorHTMLAttributes at the type level -- widen locally rather than
      // touching the shared ThemeProvider file for one prop.
      const anchorProps: any = { ...props, href: disabled ? undefined : href };
      return (
        <CanvasWrapper
          as={Component}
          ref={ref}
          {...anchorProps}
          className={classNames(
            className,
            prefix,
            size && `${prefix}-${size}`,
            tone && `text-${tone}`,
            active && 'active',
            disabled && 'disabled',
          )}
          aria-disabled={disabled ? 'true' : undefined}
          tabIndex={disabled ? -1 : props.tabIndex}
        />
      );
    },
  );

Link.displayName = 'Link';
Link.propTypes = propTypes;
Link.defaultProps = defaultProps;

export default Link;
