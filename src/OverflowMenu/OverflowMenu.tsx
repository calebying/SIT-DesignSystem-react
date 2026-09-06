import * as React from 'react';
import PropTypes from 'prop-types';

import Dropdown from '../Dropdown/Dropdown';
import DropdownToggle from '../Dropdown/DropdownToggle';
import DropdownMenu from '../Dropdown/DropdownMenu';
import IconButton from '../IconButton/IconButton';

export type OverflowMenuSize = 'sm' | 'md';

export interface OverflowMenuProps {
  /** Accessible label for the toggle button (an icon-only button has no visible text). */
  ariaLabel?: string;
  /** Toggle button size. */
  size?: OverflowMenuSize;
  /** The menu items -- typically `<Dropdown.Item>` elements. */
  children?: React.ReactNode;
}

const propTypes = {
  ariaLabel: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md']),
};

const defaultProps = {
  ariaLabel: 'More actions',
  size: 'md' as OverflowMenuSize,
};

/**
 * A "..." menu button that reveals contextual actions. Composes this
 * package's existing `Dropdown`/`Dropdown.Toggle`/`Dropdown.Menu`
 * primitives (not a reimplementation), rendering `IconButton` as the
 * toggle via `Dropdown.Toggle`'s existing `as` prop.
 */
export const OverflowMenu = React.forwardRef<HTMLDivElement, OverflowMenuProps>(
  ({ ariaLabel = 'More actions', size = 'md', children, ...props }, ref) => {
    return (
      <Dropdown ref={ref} {...props}>
        <DropdownToggle
          as={IconButton}
          name="three-dots-vertical"
          aria-label={ariaLabel}
          variant="outline-secondary"
          size={size === 'sm' ? 'sm' : undefined}
        />
        <DropdownMenu align="end">{children}</DropdownMenu>
      </Dropdown>
    );
  },
);

OverflowMenu.displayName = 'OverflowMenu';
OverflowMenu.propTypes = propTypes as any;
OverflowMenu.defaultProps = defaultProps;

export default OverflowMenu;
