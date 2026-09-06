import DescriptionListBase from './DescriptionList';
import DescriptionListGroup from './DescriptionListGroup';

export type { DescriptionListProps } from './DescriptionList';
export type { DescriptionListGroupProps } from './DescriptionListGroup';

export const DescriptionList = Object.assign(DescriptionListBase, {
  Group: DescriptionListGroup,
});

export default DescriptionList;
