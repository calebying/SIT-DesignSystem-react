import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';

import DropdownItem from '../Dropdown/DropdownItem';

export interface SelectOptionProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
  /** This option's value. */
  value: string;
  /** Disables this individual option. */
  disabled?: boolean;
  /** Set by the parent `<Select>` -- don't set directly. */
  selected?: boolean;
  /** Set by the parent `<Select>` -- don't set directly. */
  onSelect?: (value: string) => void;
}

const propTypes = {
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export const SelectOption = React.forwardRef<HTMLElement, SelectOptionProps>(
  ({ value, disabled, selected, onSelect, className, children, ...props }, ref) => {
    return (
      <DropdownItem
        ref={ref as any}
        {...props}
        disabled={disabled}
        role="option"
        aria-selected={!!selected}
        active={selected}
        className={classNames(className)}
        onClick={() => !disabled && onSelect?.(value)}
      >
        {children}
      </DropdownItem>
    );
  },
);

SelectOption.displayName = 'SelectOption';
SelectOption.propTypes = propTypes;

export default SelectOption;
