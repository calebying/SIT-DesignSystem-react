import classNames from 'classnames';
import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

import Nav from '../Nav/Nav';
import { useBootstrapPrefix, CanvasWrapper } from '../ThemeProvider/ThemeProvider';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from '../utils/helpers';
import IconButton from '../IconButton/IconButton';

export interface SubnavProps
  extends BsPrefixProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  /** A section title / heading, rendered before the nav items. Mirrors sit-subnav's `header` slot. */
  header?: React.ReactNode;
  /** Contextual actions (buttons, filters) aligned with the nav. Mirrors sit-subnav's `actions` slot. */
  actions?: React.ReactNode;
  /** The nav items -- typically `<Nav.Item>`/`<Nav.Link>` elements. */
  children?: React.ReactNode;
}

const propTypes = {
  /** @default 'subnav' */
  bsPrefix: PropTypes.string,
  header: PropTypes.node,
  actions: PropTypes.node,
};

export const Subnav: BsPrefixRefForwardingComponent<'nav', SubnavProps> =
  React.forwardRef<HTMLElement, SubnavProps>(
    ({ bsPrefix, header, actions, className, children, as: Component = 'nav', ...props }, ref) => {
      const prefix = useBootstrapPrefix(bsPrefix, 'subnav');
      const [expanded, setExpanded] = useState(false);
      const collapseId = 'subnav-collapse';

      return (
        <CanvasWrapper
          as={Component}
          ref={ref}
          {...props}
          className={classNames(className, prefix, 'border-bottom py-2')}
        >
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
            {header && <div className={`${prefix}-header fw-bold`}>{header}</div>}
            <IconButton
              name="list"
              aria-label="Toggle sub-navigation"
              aria-controls={collapseId}
              aria-expanded={expanded}
              variant="outline-secondary"
              size="sm"
              className="d-lg-none"
              onClick={() => setExpanded(!expanded)}
            />
            <div
              id={collapseId}
              className={classNames(
                'd-lg-flex align-items-center flex-wrap gap-2 w-100',
                expanded ? 'd-flex' : 'd-none',
              )}
            >
              <Nav className="me-lg-auto">{children}</Nav>
              {actions && (
                <div className={`${prefix}-actions d-flex align-items-center gap-2`}>{actions}</div>
              )}
            </div>
          </div>
        </CanvasWrapper>
      );
    },
  );

Subnav.displayName = 'Subnav';
Subnav.propTypes = propTypes;

export default Subnav;
