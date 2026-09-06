import SelectBase from './Select';
import SelectOption from './SelectOption';

export type { SelectProps } from './Select';
export type { SelectOptionProps } from './SelectOption';

export const Select = Object.assign(SelectBase, { Option: SelectOption });

export default Select;
