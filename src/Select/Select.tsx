import classNames from 'classnames';
import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

import Dropdown from '../Dropdown/Dropdown';
import DropdownToggle from '../Dropdown/DropdownToggle';
import DropdownMenu from '../Dropdown/DropdownMenu';
import generateId from '../utils/generateId';
import { SelectOptionProps } from './SelectOption';

export interface SelectProps {
  /** The selected value. */
  value?: string;
  /** Called with the newly selected value when an option is clicked. */
  onChange?: (value: string) => void;
  /** Shown when no option is selected. */
  placeholder?: string;
  /** Disables the whole select. */
  disabled?: boolean;
  /** Select size, matching `Button`'s own size scale. */
  size?: 'sm' | 'lg';
  /** `<SelectOption>` children. */
  children?: React.ReactNode;
}

const propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'lg']),
};

const defaultProps = {
  placeholder: 'Select an option',
};

/**
 * A closed-list select dropdown -- distinct from the existing `Combobox`
 * (a free-text typeahead filtering a suggestion list). Composes this
 * repo's existing Dropdown/Dropdown.Toggle/Dropdown.Menu primitives (the
 * same ones Combobox itself already uses internally), with the corrected
 * role="combobox" (toggle) / role="listbox" (menu) / role="option" (each
 * SelectOption) ARIA pattern -- verified first that Combobox already uses
 * this corrected shape (a P0 fix in the web-component package's own prior
 * pass), so this new component follows it from the start rather than
 * repeating the old role="menu" mistake.
 */
export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ value, onChange, placeholder = 'Select an option', disabled, size, children, ...props }, ref) => {
    const [show, setShow] = useState(false);
    const listboxId = React.useMemo(() => generateId('select', 'listbox'), []);

    let selectedLabel: React.ReactNode = placeholder;
    const options = React.Children.map(children, (child) => {
      if (!React.isValidElement<SelectOptionProps>(child)) return child;
      const selected = child.props.value === value;
      if (selected) selectedLabel = child.props.children;
      return React.cloneElement(child, {
        selected,
        onSelect: (optionValue: string) => {
          onChange?.(optionValue);
          setShow(false);
        },
      } as Partial<SelectOptionProps>);
    });

    return (
      <Dropdown ref={ref} show={show} onToggle={setShow} {...props}>
        <DropdownToggle
          variant="outline-secondary"
          size={size}
          disabled={disabled}
          role="combobox"
          aria-expanded={show}
          aria-controls={listboxId}
          // NOTE: DropdownToggle hardcodes aria-haspopup="menu" in its own
          // render (src/Dropdown/DropdownToggle.tsx), after props are
          // spread -- passing aria-haspopup="listbox" here is silently
          // overridden, not a real override. Verified directly rather than
          // assumed correct. "menu" is still a valid (if less precise)
          // aria-haspopup value, so left as a known, minor limitation of
          // composing the existing toggle rather than forking it for one
          // attribute -- the actual P0 fix this component matters for is
          // the *role* pattern (combobox/listbox/option, not menu), which
          // is correct below and on the toggle itself.
          className={classNames('w-100 text-start d-flex justify-content-between align-items-center')}
        >
          <span className={classNames(selectedLabel === placeholder && 'text-muted')}>{selectedLabel}</span>
        </DropdownToggle>
        <DropdownMenu id={listboxId} role="listbox" className="w-100">
          {options}
        </DropdownMenu>
      </Dropdown>
    );
  },
);

Select.displayName = 'Select';
Select.propTypes = propTypes as any;
Select.defaultProps = defaultProps;

export default Select;
