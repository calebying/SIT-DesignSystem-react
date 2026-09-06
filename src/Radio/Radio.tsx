import * as React from 'react';
import FormCheck, { FormCheckProps } from '../Form/FormCheck';
import { BsPrefixRefForwardingComponent } from '../utils/helpers';

export type RadioProps = Omit<FormCheckProps, 'type'>;

/**
 * A dedicated, discoverable `Radio` -- fixes this repo's generic `FormCheck`
 * to `type="radio"`, the same way `Form/Switch.tsx` fixes it to
 * `type="switch"`, rather than reimplementing radio rendering.
 */
const Radio: BsPrefixRefForwardingComponent<typeof FormCheck, RadioProps> =
  React.forwardRef<typeof FormCheck, RadioProps>((props, ref) => (
    <FormCheck {...props} ref={ref} type="radio" />
  ));

Radio.displayName = 'Radio';

export default Object.assign(Radio, {
  Input: FormCheck.Input,
  Label: FormCheck.Label,
});
