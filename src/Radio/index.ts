import RadioBase from './Radio';
import RadioGroup from './RadioGroup';

export type { RadioProps } from './Radio';
export type { RadioGroupProps } from './RadioGroup';

export const Radio = Object.assign(RadioBase, { Group: RadioGroup });

export default Radio;
