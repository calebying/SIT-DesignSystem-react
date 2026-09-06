import * as React from 'react';
import FormControl, { FormControlProps } from '../Form/FormControl';
import { BsPrefixRefForwardingComponent } from '../utils/helpers';

export type InputProps = FormControlProps;

/**
 * A dedicated, discoverable `Input` -- this repo's generic `FormControl`
 * already renders a text input by default (`as="input"`), this just gives
 * it a name matching sit-input rather than the generic Bootstrap
 * `Form.Control` naming.
 */
export const Input: BsPrefixRefForwardingComponent<'input', InputProps> =
  React.forwardRef((props: InputProps, ref: React.Ref<HTMLInputElement>) => (
    <FormControl {...props} ref={ref as any} />
  ));

Input.displayName = 'Input';

export default Input;
