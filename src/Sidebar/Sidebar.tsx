import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';

import SideNav from '../SideNav/SideNav';
import { useBootstrapPrefix, CanvasWrapper } from '../ThemeProvider/ThemeProvider';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from '../utils/helpers';

export type SidebarVariant = 'persistent' | 'overlay' | 'collapsible';

export interface SidebarProps
  extends BsPrefixProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  /** Collapses the sidebar to its icon-only rail width. */
  collapsed?: boolean;
  /** Renders a scrim behind an `overlay` sidebar when open. */
  scrim?: boolean;
  /** Sidebar behaviour variant. Mirrors sit-sidebar's `variant` prop. */
  variant?: SidebarVariant;
  /** Accessible label for the sidebar's `<nav>` landmark. */
  ariaLabel?: string;
  /** Header content (brand/logo). Mirrors sit-sidebar's `upper` slot. */
  upper?: React.ReactNode;
  /** Footer content. Mirrors sit-sidebar's `lower` slot. */
  lower?: React.ReactNode;
  /** Navigation content -- typically `<SideNav.Item>`/`<SideNav.Link>` elements, rendered inside a `SideNav`. */
  children?: React.ReactNode;
}

const propTypes = {
  /** @default 'sidebar' */
  bsPrefix: PropTypes.string,
  collapsed: PropTypes.bool,
  scrim: PropTypes.bool,
  variant: PropTypes.oneOf(['persistent', 'overlay', 'collapsible']),
  ariaLabel: PropTypes.string,
  upper: PropTypes.node,
  lower: PropTypes.node,
};

const defaultProps = {
  collapsed: false,
  scrim: false,
  variant: 'collapsible' as SidebarVariant,
  ariaLabel: 'Sidebar navigation',
};

/**
 * A collapsible sidebar shell. Composes the existing `SideNav` primitive for
 * its navigation content (not a reimplementation) and adds the outer chrome
 * sit-sidebar has that SideNav does not: collapse/scrim/variant behaviour and
 * upper/lower header/footer slots.
 */
export const Sidebar: BsPrefixRefForwardingComponent<'nav', SidebarProps> =
  React.forwardRef<HTMLElement, SidebarProps>(
    (
      {
        bsPrefix,
        collapsed,
        scrim,
        variant = 'collapsible',
        ariaLabel = 'Sidebar navigation',
        upper,
        lower,
        className,
        children,
        as: Component = 'nav',
        ...props
      },
      ref,
    ) => {
      const prefix = useBootstrapPrefix(bsPrefix, 'sidebar');
      return (
        <>
          {variant === 'overlay' && scrim && !collapsed && (
            <div className={`${prefix}-scrim`} aria-hidden="true" />
          )}
          <CanvasWrapper
            as={Component}
            ref={ref}
            {...props}
            aria-label={ariaLabel}
            className={classNames(
              className,
              prefix,
              `${prefix}-${variant}`,
              collapsed && `${prefix}-collapsed`,
              'd-flex flex-column h-100',
            )}
          >
            {upper && <div className={`${prefix}-upper`}>{upper}</div>}
            <div className={`${prefix}-content flex-grow-1 overflow-auto`}>
              <SideNav>{children}</SideNav>
            </div>
            {lower && <div className={`${prefix}-lower`}>{lower}</div>}
          </CanvasWrapper>
        </>
      );
    },
  );

Sidebar.displayName = 'Sidebar';
Sidebar.propTypes = propTypes as any;
Sidebar.defaultProps = defaultProps;

export default Object.assign(Sidebar, {
  Item: SideNav.Item,
  Link: SideNav.Link,
});
