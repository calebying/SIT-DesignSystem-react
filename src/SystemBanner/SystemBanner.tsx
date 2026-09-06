import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';
import { useUncontrolled } from 'uncontrollable';
import useEventCallback from '@restart/hooks/useEventCallback';

import CloseButton from '../CloseButton/CloseButton';
import { useBootstrapPrefix, CanvasWrapper } from '../ThemeProvider/ThemeProvider';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from '../utils/helpers';

export interface SystemBannerProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {
  /** Whether the banner is shown. Controllable together with `onClose`, mirroring `Alert`'s own `show`/`onClose` pattern. */
  show?: boolean;
  /** Renders a close button and lets the banner be dismissed. */
  dismissible?: boolean;
  /** Callback fired when the close button is clicked, with the new `show` value. */
  onClose?: (show: false, event: React.MouseEvent) => void;
  /** Renders the banner content inside a fluid (full-width) container. */
  fluid?: boolean;
  /** Accessible label for the close button. */
  closeLabel?: string;
}

const propTypes = {
  /** @default 'system-banner' */
  bsPrefix: PropTypes.string,
  show: PropTypes.bool,
  dismissible: PropTypes.bool,
  onClose: PropTypes.func,
  fluid: PropTypes.bool,
  closeLabel: PropTypes.string,
};

const defaultProps = {
  show: true,
  dismissible: false,
  fluid: false,
  closeLabel: 'Close banner',
};

/**
 * A full-width banner pinned above the main content, for site-wide notices
 * (maintenance windows, incident status, etc). Mirrors sit-system-banner's
 * show/dismissible/fluid API; its dismiss behaviour follows the same
 * useUncontrolled + CloseButton pattern this repo's own Alert component
 * already uses.
 */
export const SystemBanner: BsPrefixRefForwardingComponent<'div', SystemBannerProps> =
  React.forwardRef<HTMLElement, SystemBannerProps>((uncontrolledProps, ref) => {
    const {
      bsPrefix,
      show,
      dismissible,
      onClose,
      fluid,
      closeLabel,
      className,
      children,
      as: Component = 'div',
      ...props
    } = useUncontrolled(uncontrolledProps, { show: 'onClose' });

    const prefix = useBootstrapPrefix(bsPrefix, 'system-banner');
    const handleClose = useEventCallback((e: React.MouseEvent) => {
      onClose?.(false, e);
    });

    if (!show) return null;

    return (
      <CanvasWrapper
        as={Component}
        ref={ref}
        role="region"
        {...props}
        className={classNames(className, prefix, 'py-2')}
      >
        <div className={classNames(fluid ? 'container-fluid' : 'container')}>
          <div className="d-flex align-items-center justify-content-between gap-2">
            <div className={`${prefix}-content flex-grow-1`}>{children}</div>
            {dismissible && (
              <CloseButton onClick={handleClose} aria-label={closeLabel} className="btn-sm" />
            )}
          </div>
        </div>
      </CanvasWrapper>
    );
  });

SystemBanner.displayName = 'SystemBanner';
SystemBanner.propTypes = propTypes;
SystemBanner.defaultProps = defaultProps;

export default SystemBanner;
