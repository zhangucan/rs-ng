import {PngTableColumnProps, PngTableProps} from '@er/primeng';
import {Settings} from '../../fields/settings';

export const table = <PngTableProps>{
  entity: Settings,
  columns: <PngTableColumnProps[]>[
    {
      dataField: Settings.fields.post,
      contentKey: 'name',
    },
    {
      dataField: Settings.fields.title,
      contentKey: 'name',
    },
    {
      dataField: Settings.fields.salary,
    },
  ],
  $ext: {
    hasAddAction: true,
    hasDeleteAction: true,
    rowExpandable: true,
    hasEditAction: true,
  },
};
