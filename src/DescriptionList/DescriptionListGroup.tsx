import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';

import { useBootstrapPrefix, CanvasWrapper } from '../ThemeProvider/ThemeProvider';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from '../utils/helpers';

export interface DescriptionListGroupProps
  extends BsPrefixProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** A group title, rendered above the description list items. */
  title?: React.ReactNode;
  /** A group description, rendered below the title. */
  description?: React.ReactNode;
  /** Stacks every child `<DescriptionList>`'s label above its data. */
  stacked?: boolean;
  /** Renders a divider border between every child `<DescriptionList>`. */
  bordered?: boolean;
}

const propTypes = {
  /** @default 'description-list-group' */
  bsPrefix: PropTypes.string,
  title: PropTypes.node,
  description: PropTypes.node,
  stacked: PropTypes.bool,
  bordered: PropTypes.bool,
};

const defaultProps = {
  stacked: false,
  bordered: false,
};

export const DescriptionListGroup: BsPrefixRefForwardingComponent<'div', DescriptionListGroupProps> =
  React.forwardRef<HTMLElement, DescriptionListGroupProps>(
    (
      { bsPrefix, title, description, stacked, bordered, className, children, as: Component = 'div', ...props },
      ref,
    ) => {
      const prefix = useBootstrapPrefix(bsPrefix, 'description-list-group');
      // Passes stacked/bordered down to child DescriptionList elements that
      // did not set their own value, so a group-level default applies
      // without every item having to repeat it.
      const items = React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child, {
          stacked: child.props.stacked ?? stacked,
          bordered: child.props.bordered ?? bordered,
        } as any);
      });

      return (
        <CanvasWrapper as={Component} ref={ref} {...props} className={classNames(className, prefix)}>
          {title && <div className={`${prefix}-title fw-bold mb-1`}>{title}</div>}
          {description && <div className={`${prefix}-description text-muted mb-2`}>{description}</div>}
          <div className={`${prefix}-content`}>{items}</div>
        </CanvasWrapper>
      );
    },
  );

DescriptionListGroup.displayName = 'DescriptionListGroup';
DescriptionListGroup.propTypes = propTypes;
DescriptionListGroup.defaultProps = defaultProps;

export default DescriptionListGroup;
