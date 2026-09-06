import classNames from 'classnames';
import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

import { useBootstrapPrefix, CanvasWrapper } from '../ThemeProvider/ThemeProvider';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from '../utils/helpers';
import Icon from '../Icon/Icon';

export interface MastheadProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {
  /** Removes the max-width constraint, letting content stretch full screen width. */
  fluid?: boolean;
}

const propTypes = {
  /** @default 'masthead' */
  bsPrefix: PropTypes.string,
  fluid: PropTypes.bool,
};

const defaultProps = {
  fluid: false,
};

/**
 * The official government banner every .gov.sg digital service places at the
 * top of the page (per SGDS/GovTech convention -- this design system started
 * as a fork of GovTech's SGDS). Simplified from sit-masthead's real SG-crest
 * SVG artwork to a bootstrap-icons flag glyph (a real, documented
 * simplification -- porting the exact crest paths wasn't warranted for a
 * component whose main job here is the identify-toggle *behaviour* and
 * layout structure, not pixel-identical crest artwork).
 */
export const Masthead: BsPrefixRefForwardingComponent<'div', MastheadProps> =
  React.forwardRef<HTMLElement, MastheadProps>(
    ({ bsPrefix, fluid, className, as: Component = 'div', ...props }, ref) => {
      const prefix = useBootstrapPrefix(bsPrefix, 'masthead');
      const [expanded, setExpanded] = useState(false);

      return (
        <CanvasWrapper
          as={Component}
          ref={ref}
          {...props}
          className={classNames(className, prefix, 'bg-light py-1')}
        >
          <div className={classNames(fluid ? 'container-fluid' : 'container')}>
            <div className="d-flex align-items-center gap-2">
              <Icon name="flag-fill" size="sm" ariaLabel={undefined} />
              <span className="fs-6">A Singapore Government Agency Website</span>
              <button
                type="button"
                className="btn btn-link btn-sm text-decoration-underline p-0 ms-1"
                aria-expanded={expanded}
                onClick={() => setExpanded(!expanded)}
              >
                How to identify
                <Icon
                  name={expanded ? 'chevron-up' : 'chevron-down'}
                  size="xs"
                  className="ms-1"
                  ariaLabel={undefined}
                />
              </button>
            </div>
            {expanded && (
              <div className="row py-3">
                <div className="col-md-6 d-flex gap-2 mb-3 mb-md-0">
                  <Icon name="bank" size="lg" ariaLabel={undefined} />
                  <div>
                    <strong className="d-block">Official website links end with .gov.sg</strong>
                    <span>
                      Government agencies communicate via .gov.sg websites (e.g. go.gov.sg/open).
                      Trusted websites
                    </span>
                  </div>
                </div>
                <div className="col-md-6 d-flex gap-2">
                  <Icon name="lock-fill" size="lg" ariaLabel={undefined} />
                  <div>
                    <strong className="d-block">Secure websites use HTTPS</strong>
                    <span>
                      Look for a lock (
                      <Icon name="lock-fill" size="xs" ariaLabel={undefined} />) or https:// as an
                      added precaution.
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CanvasWrapper>
      );
    },
  );

Masthead.displayName = 'Masthead';
Masthead.propTypes = propTypes;
Masthead.defaultProps = defaultProps;

export default Masthead;
