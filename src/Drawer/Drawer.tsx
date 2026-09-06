import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';

import CloseButton from '../CloseButton/CloseButton';
import { useBootstrapPrefix, CanvasWrapper } from '../ThemeProvider/ThemeProvider';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from '../utils/helpers';

export type DrawerSize = 'sm' | 'md' | 'lg';
export type DrawerPlacement = 'top' | 'end' | 'bottom' | 'start';

export interface DrawerProps
  extends BsPrefixProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** Whether the drawer is shown. */
  open?: boolean;
  /** Drawer size. */
  size?: DrawerSize;
  /** Which edge the drawer slides in from. */
  placement?: DrawerPlacement;
  /** Accessible label for the drawer's dialog role. */
  ariaLabel?: string;
  /** Drawer title, rendered in the header next to the close button. */
  title?: React.ReactNode;
  /** Drawer description, rendered under the title. */
  description?: React.ReactNode;
  /** Footer content, typically action buttons. */
  footer?: React.ReactNode;
  /** Called when the close button or backdrop is clicked. */
  onClose?: (source: 'close-button' | 'overlay') => void;
}

const propTypes = {
  /** @default 'drawer' */
  bsPrefix: PropTypes.string,
  open: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  placement: PropTypes.oneOf(['top', 'end', 'bottom', 'start']),
  ariaLabel: PropTypes.string,
  title: PropTypes.node,
  description: PropTypes.node,
  footer: PropTypes.node,
  onClose: PropTypes.func,
};

const defaultProps = {
  open: false,
  size: 'sm' as DrawerSize,
  placement: 'end' as DrawerPlacement,
  ariaLabel: 'Drawer',
};

const SIZE_WIDTH: Record<DrawerSize, string> = {
  sm: '320px',
  md: '480px',
  lg: '640px',
};

/**
 * A slide-in panel, built on Bootstrap's real offcanvas component
 * (.offcanvas/.offcanvas-{placement}/.show -- see
 * https://getbootstrap.com/docs/5.2/components/offcanvas/, already imported
 * by @sit-canvas/canvas-css) rather than a bespoke implementation. Simpler
 * than `Modal` (no focus trap / portal) since sit-drawer's own real-world
 * usage is a same-page contextual panel, not a page-blocking dialog.
 */
export const Drawer: BsPrefixRefForwardingComponent<'div', DrawerProps> =
  React.forwardRef<HTMLElement, DrawerProps>(
    (
      {
        bsPrefix,
        open,
        size = 'sm',
        placement = 'end',
        ariaLabel = 'Drawer',
        title,
        description,
        footer,
        onClose,
        className,
        children,
        as: Component = 'div',
        ...props
      },
      ref,
    ) => {
      const prefix = useBootstrapPrefix(bsPrefix, 'offcanvas');
      const isVertical = placement === 'top' || placement === 'bottom';

      return (
        <>
          {open && (
            <div
              className="offcanvas-backdrop fade show"
              onClick={() => onClose?.('overlay')}
              aria-hidden="true"
            />
          )}
          <CanvasWrapper
            as={Component}
            ref={ref}
            {...props}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            className={classNames(className, prefix, `${prefix}-${placement}`, open && 'show')}
            style={{ visibility: open ? 'visible' : 'hidden', ...(isVertical ? undefined : { width: SIZE_WIDTH[size] }) }}
          >
            <div className="offcanvas-header">
              <div>
                {title && <h5 className="offcanvas-title">{title}</h5>}
                {description && <p className="mb-0 text-muted">{description}</p>}
              </div>
              <CloseButton onClick={() => onClose?.('close-button')} aria-label="Close" />
            </div>
            <div className="offcanvas-body">{children}</div>
            {footer && <div className="offcanvas-footer border-top p-3">{footer}</div>}
          </CanvasWrapper>
        </>
      );
    },
  );

Drawer.displayName = 'Drawer';
Drawer.propTypes = propTypes;
Drawer.defaultProps = defaultProps;

export default Drawer;
