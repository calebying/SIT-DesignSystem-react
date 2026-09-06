import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';

import Navbar, { NavbarProps } from '../Nav/Navbar';
import Nav from '../Nav/Nav';
import Container from '../Container/Container';
import { BsPrefixProps } from '../utils/helpers';

export interface MainnavProps extends Omit<NavbarProps, 'children'>, BsPrefixProps {
  /** Brand/logo content, rendered via `Navbar.Brand`. */
  brand?: React.ReactNode;
  /** `href` for the brand link. */
  brandHref?: string;
  /** Elements positioned at the end of the collapsible nav (also included in the collapsed menu). Mirrors sit-mainnav's `end` slot. */
  end?: React.ReactNode;
  /** Elements that are never collapsed into the hamburger menu, always visible. Mirrors sit-mainnav's `non-collapsible` slot. */
  nonCollapsible?: React.ReactNode;
  /** `id` shared between the toggle button and the collapsible region (required for accessible `aria-controls`). */
  collapseId?: string;
  /** Renders the navbar content inside a fluid (full-width) container. */
  fluid?: boolean;
  /** The main nav items -- typically `<Nav.Item>`/`<Nav.Link>`/`<NavDropdown>` elements. Rendered inside `Navbar.Collapse`. */
  children?: React.ReactNode;
}

const propTypes = {
  brand: PropTypes.node,
  brandHref: PropTypes.string,
  end: PropTypes.node,
  nonCollapsible: PropTypes.node,
  collapseId: PropTypes.string,
  fluid: PropTypes.bool,
};

const defaultProps = {
  expand: 'lg' as NavbarProps['expand'],
  collapseId: 'mainnav-collapse',
  fluid: false,
};

/**
 * A SIT-branded, opinionated composite over this package's existing generic
 * `Navbar`/`Navbar.Brand`/`Navbar.Toggle`/`Navbar.Collapse`/`Nav` primitives
 * (src/Nav) -- not a reimplementation. Mirrors sit-mainnav's slot API
 * (brand/end/non-collapsible) from the web-component package.
 */
export const Mainnav = React.forwardRef<HTMLElement, MainnavProps>(
  (
    {
      brand,
      brandHref,
      end,
      nonCollapsible,
      collapseId = 'mainnav-collapse',
      fluid,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <Navbar ref={ref} className={classNames(className)} {...props}>
        <Container fluid={fluid} className="d-flex align-items-center flex-wrap">
          {brand && <Navbar.Brand href={brandHref}>{brand}</Navbar.Brand>}
          {nonCollapsible && (
            <div className="non-collapsible d-flex align-items-center gap-2">{nonCollapsible}</div>
          )}
          <Navbar.Toggle aria-controls={collapseId} />
          <Navbar.Collapse id={collapseId}>
            <Nav className="me-auto">{children}</Nav>
            {end && <div className="slot-end d-flex align-items-center gap-2 ms-auto">{end}</div>}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  },
);

Mainnav.displayName = 'Mainnav';
Mainnav.propTypes = propTypes as any;
Mainnav.defaultProps = defaultProps;

export default Mainnav;
