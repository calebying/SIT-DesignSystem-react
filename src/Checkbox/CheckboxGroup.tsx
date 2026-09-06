import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';

export interface CheckboxGroupProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  /** A group legend/heading. */
  label?: React.ReactNode;
  /** Lays child checkboxes out in a row instead of a column. */
  inline?: boolean;
  /** Shared `name` propagated to any child `<Checkbox>` that did not set its own -- conventional for a checkbox group submitting as `name[]`. */
  name?: string;
}

const propTypes = {
  label: PropTypes.node,
  inline: PropTypes.bool,
  name: PropTypes.string,
};

/** Groups multiple `<Checkbox>` elements under one legend. */
export const CheckboxGroup = React.forwardRef<HTMLFieldSetElement, CheckboxGroupProps>(
  ({ label, inline, name, className, children, ...props }, ref) => {
    const items = React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;
      return React.cloneElement(child, {
        name: (child.props as any).name ?? name,
        inline: (child.props as any).inline ?? inline,
      } as any);
    });

    return (
      <fieldset ref={ref} {...props} className={classNames(className, 'checkbox-group')}>
        {label && <legend className="col-form-label">{label}</legend>}
        {items}
      </fieldset>
    );
  },
);

CheckboxGroup.displayName = 'CheckboxGroup';
CheckboxGroup.propTypes = propTypes;

export default CheckboxGroup;
