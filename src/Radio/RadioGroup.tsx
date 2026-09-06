import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';
import generateId from '../utils/generateId';

export interface RadioGroupProps
  extends Omit<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, 'onChange'> {
  /** A group legend/heading. */
  label?: React.ReactNode;
  /** Lays child radios out in a row instead of a column. */
  inline?: boolean;
  /** Shared `name` for every child `<Radio>` -- required for native mutual exclusivity. Auto-generated if unset. */
  name?: string;
  /** The selected value. */
  value?: string;
  /** Called with the newly selected value when a child radio changes. */
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  /** `<Radio>` children, each with its own `value` prop. */
  children?: React.ReactNode;
}

const propTypes = {
  label: PropTypes.node,
  inline: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

/**
 * Groups `<Radio>` elements under one shared `name` (native mutual
 * exclusivity) plus a controlled `value`/`onChange` pair, mirroring
 * sit-radio-group's real controlled API.
 */
export const RadioGroup = React.forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  ({ label, inline, name, value, onChange, className, children, ...props }, ref) => {
    const generatedName = React.useMemo(() => name ?? generateId('radio-group'), [name]);

    const items = React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;
      const childValue = (child.props as any).value;
      return React.cloneElement(child, {
        name: generatedName,
        inline: (child.props as any).inline ?? inline,
        checked: value !== undefined ? childValue === value : (child.props as any).checked,
        onChange:
          (child.props as any).onChange ??
          ((event: React.ChangeEvent<HTMLInputElement>) => onChange?.(childValue, event)),
      } as any);
    });

    return (
      <fieldset ref={ref} {...props} className={classNames(className, 'radio-group')}>
        {label && <legend className="col-form-label">{label}</legend>}
        {items}
      </fieldset>
    );
  },
);

RadioGroup.displayName = 'RadioGroup';
RadioGroup.propTypes = propTypes;

export default RadioGroup;
