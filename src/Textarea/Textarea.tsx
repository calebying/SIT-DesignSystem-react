import * as React from 'react';
import FormControl, { FormControlProps } from '../Form/FormControl';
import { BsPrefixRefForwardingComponent } from '../utils/helpers';

export type TextareaProps = Omit<FormControlProps, 'as' | 'type'> & {
  /** Number of visible text rows. */
  rows?: number;
};

/**
 * A dedicated, discoverable `Textarea` -- fixes this repo's generic
 * `FormControl` to `as="textarea"`, the same "fix one prop" pattern
 * `Form/Switch.tsx` already uses for `type="switch"`.
 */
export const Textarea: BsPrefixRefForwardingComponent<'textarea', TextareaProps> =
  React.forwardRef((props: TextareaProps, ref: React.Ref<HTMLTextAreaElement>) => (
    <FormControl {...props} as="textarea" ref={ref as any} />
  ));

Textarea.displayName = 'Textarea';

export default Textarea;
