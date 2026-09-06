import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';

import { useBootstrapPrefix, CanvasWrapper } from '../ThemeProvider/ThemeProvider';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from '../utils/helpers';

export interface TableOfContentsProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {
  /** The header content, e.g. "On this page". Mirrors sit-table-of-contents's default slot. */
  header?: React.ReactNode;
}

export interface TableOfContentsItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
}

const propTypes = {
  /** @default 'table-of-contents' */
  bsPrefix: PropTypes.string,
  header: PropTypes.node,
};

const TableOfContentsItem = React.forwardRef<HTMLAnchorElement, TableOfContentsItemProps>(
  ({ active, className, ...props }, ref) => (
    <a
      ref={ref}
      {...props}
      className={classNames(className, 'table-of-contents-item d-block py-1', active && 'fw-bold text-primary')}
    />
  ),
);
TableOfContentsItem.displayName = 'TableOfContentsItem';

const TableOfContentsBase: BsPrefixRefForwardingComponent<'nav', TableOfContentsProps> =
  React.forwardRef<HTMLElement, TableOfContentsProps>(
    ({ bsPrefix, header, className, children, as: Component = 'nav', ...props }, ref) => {
      const prefix = useBootstrapPrefix(bsPrefix, 'table-of-contents');
      return (
        <CanvasWrapper
          as={Component}
          ref={ref}
          aria-label={typeof header === 'string' ? header : 'Table of contents'}
          {...props}
          className={classNames(className, prefix)}
        >
          {header && <div className={`${prefix}-header fw-bold mb-2`}>{header}</div>}
          <div className={`${prefix}-contents`}>{children}</div>
        </CanvasWrapper>
      );
    },
  );
TableOfContentsBase.displayName = 'TableOfContents';
TableOfContentsBase.propTypes = propTypes;

export const TableOfContents = Object.assign(TableOfContentsBase, { Item: TableOfContentsItem });

export default TableOfContents;
