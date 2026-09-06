import CheckboxBase from './Checkbox';
import CheckboxGroup from './CheckboxGroup';

export type { CheckboxProps } from './Checkbox';
export type { CheckboxGroupProps } from './CheckboxGroup';

export const Checkbox = Object.assign(CheckboxBase, { Group: CheckboxGroup });

export default Checkbox;
