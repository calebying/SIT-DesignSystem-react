import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';

import { useBootstrapPrefix, CanvasWrapper } from '../ThemeProvider/ThemeProvider';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from '../utils/helpers';

export type IconListSize = 'sm' | 'md' | 'lg';

export interface IconListProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {
  size?: IconListSize;
}

export interface IconListItemProps extends React.HTMLAttributes<HTMLElement> {
  /** The item's icon, e.g. `<Icon name="check-circle" />`. */
  icon?: React.ReactNode;
}

const propTypes = {
  /** @default 'icon-list' */
  bsPrefix: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

const defaultProps = {
  size: 'md' as IconListSize,
};

const IconListItem = React.forwardRef<HTMLLIElement, IconListItemProps>(
  ({ icon, className, children, ...props }, ref) => (
    <li
      ref={ref}
      role="listitem"
      {...props}
      className={classNames(className, 'icon-list-item d-flex align-items-start gap-2 mb-2')}
    >
      {icon && <span className="icon-list-item-icon flex-shrink-0">{icon}</span>}
      <span className="icon-list-item-content">{children}</span>
    </li>
  ),
);
IconListItem.displayName = 'IconListItem';

const IconListBase: BsPrefixRefForwardingComponent<'ul', IconListProps> =
  React.forwardRef<HTMLElement, IconListProps>(
    ({ bsPrefix, size = 'md', className, as: Component = 'ul', ...props }, ref) => {
      const prefix = useBootstrapPrefix(bsPrefix, 'icon-list');
      return (
        <CanvasWrapper
          as={Component}
          ref={ref}
          role="list"
          {...props}
          className={classNames(className, prefix, `${prefix}-${size}`, 'list-unstyled')}
        />
      );
    },
  );
IconListBase.displayName = 'IconList';
IconListBase.propTypes = propTypes;
IconListBase.defaultProps = defaultProps;

export const IconList = Object.assign(IconListBase, { Item: IconListItem });

export default IconList;
