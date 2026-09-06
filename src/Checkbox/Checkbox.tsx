import * as React from 'react';
import FormCheck, { FormCheckProps } from '../Form/FormCheck';
import { BsPrefixRefForwardingComponent } from '../utils/helpers';

export type CheckboxProps = Omit<FormCheckProps, 'type'>;

/**
 * A dedicated, discoverable `Checkbox` -- this repo's generic `FormCheck`
 * already supports checkbox/radio/switch via its `type` prop (that's how
 * `Form/Switch.tsx` is built), so this fixes `type="checkbox"` the same way,
 * rather than reimplementing checkbox rendering.
 */
const Checkbox: BsPrefixRefForwardingComponent<typeof FormCheck, CheckboxProps> =
  React.forwardRef<typeof FormCheck, CheckboxProps>((props, ref) => (
    <FormCheck {...props} ref={ref} type="checkbox" />
  ));

Checkbox.displayName = 'Checkbox';

export default Object.assign(Checkbox, {
  Input: FormCheck.Input,
  Label: FormCheck.Label,
});
