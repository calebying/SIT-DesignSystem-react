import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';

import Button, { ButtonProps } from '../Button/Button';
import Icon, { IconSize } from '../Icon/Icon';
import Spinner from '../Spinner/Spinner';

export interface IconButtonProps extends Omit<ButtonProps, 'children'> {
  /** The bootstrap-icons icon name (without the `bi-` prefix). */
  name: string;
  /** Shows a spinner in place of the icon and disables the button. */
  loading?: boolean;
  /** Overrides the icon size derived automatically from the button `size`. */
  iconSize?: IconSize;
  /** Accessible label -- required, since an icon-only button has no visible text. */
  'aria-label': string;
}

const propTypes = {
  name: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  iconSize: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2-xl', '3-xl']),
  'aria-label': PropTypes.string.isRequired,
};

const defaultProps = {
  loading: false,
};

// Bootstrap button size ("sm"|"lg"|undefined) -> icon size, mirroring the
// tier-shift already used by sit-icon-button in the web-component package
// (its own _assignIconSize bumps the icon one tier up from the button size).
const BUTTON_SIZE_TO_ICON_SIZE: Record<'sm' | 'lg' | 'default', IconSize> = {
  sm: 'md',
  default: 'lg',
  lg: 'xl',
};

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ name, loading, iconSize, size, className, disabled, ...props }, ref) => {
    const resolvedIconSize = iconSize ?? BUTTON_SIZE_TO_ICON_SIZE[size ?? 'default'];
    return (
      <Button
        ref={ref}
        size={size}
        disabled={disabled || loading}
        className={classNames(className, 'btn-icon')}
        {...props}
      >
        {loading ? (
          <Spinner animation="border" size="sm" label="Loading" />
        ) : (
          <Icon name={name} size={resolvedIconSize} ariaLabel={undefined} />
        )}
      </Button>
    );
  },
);

IconButton.displayName = 'IconButton';
IconButton.propTypes = propTypes as any;
IconButton.defaultProps = defaultProps;

export default IconButton;
