import {PngTableColumnProps, PngTableProps} from '@er/primeng';
import {Achievement} from '../../fields/achievement';

export const table = <PngTableProps>{
  entity: Achievement,
  columns: <PngTableColumnProps[]>[
    {
      dataField: Achievement.fields.achievementType
    },
    {
      dataField: Achievement.fields.amount
    },
    {
      dataField: Achievement.fields.occurDate
    }
  ],
  $ext: {
    hasAddAction: true,
    hasDeleteAction: true,
    hasEditAction: true,
    rowExpandable: true
  }
};
