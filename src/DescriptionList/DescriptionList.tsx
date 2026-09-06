import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';

import { useBootstrapPrefix, CanvasWrapper } from '../ThemeProvider/ThemeProvider';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from '../utils/helpers';

export interface DescriptionListProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {
  /** Stacks the label above its data instead of side-by-side. */
  stacked?: boolean;
  /** Renders a divider border between each label/data pair. */
  bordered?: boolean;
}

const propTypes = {
  /** @default 'description-list' */
  bsPrefix: PropTypes.string,
  stacked: PropTypes.bool,
  bordered: PropTypes.bool,
};

// No stacked/bordered defaultProps here (deliberately): a parent
// <DescriptionList.Group> falls back to its own stacked/bordered value for
// any item that "did not set its own" (see DescriptionListGroup.tsx), by
// checking `child.props.stacked ?? groupStacked`. React resolves a
// component's defaultProps into child.props at element-creation time --
// before the Group ever sees it -- so a `false` default here would already
// look "explicitly set to false" to that ?? check, permanently defeating
// the group-level fallback. Treated as falsy in the render body below
// instead, which behaves identically for a consumer using this component
// standalone.

/**
 * A single label/data pair, e.g. `<DescriptionList>Name<span>Jane Tan</span></DescriptionList>` --
 * the first child is the label, the rest is the data. Place one or more inside a
 * `<DescriptionList.Group>`.
 */
export const DescriptionList: BsPrefixRefForwardingComponent<'div', DescriptionListProps> =
  React.forwardRef<HTMLElement, DescriptionListProps>(
    (
      { bsPrefix, stacked, bordered, className, children, as: Component = 'div', ...props },
      ref,
    ) => {
      const prefix = useBootstrapPrefix(bsPrefix, 'description-list');
      const [label, ...data] = React.Children.toArray(children);
      return (
        <CanvasWrapper
          as={Component}
          ref={ref}
          {...props}
          className={classNames(
            className,
            prefix,
            stacked ? 'd-flex flex-column' : 'd-flex flex-row justify-content-between',
            bordered && 'border-bottom pb-2 mb-2',
          )}
        >
          <div className={`${prefix}-label text-muted`}>{label}</div>
          <div className={`${prefix}-data fw-semibold`}>{data}</div>
        </CanvasWrapper>
      );
    },
  );

DescriptionList.displayName = 'DescriptionList';
DescriptionList.propTypes = propTypes;

export default DescriptionList;
