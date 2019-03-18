import {PngTableColumnProps, PngTableProps} from '@er/primeng';
import {DataAttr} from '@er/types';
import {Competitors} from '../../fields/competitor';

export const table = <PngTableProps>{
  entity: Competitors,
  columns: <PngTableColumnProps[]>[
    {
      dataField: Competitors.fields.name,
      dataAttr: DataAttr.TAG
    }
  ],
  $ext: {
    hasAddAction: true,
    hasDeleteAction: true,
    hasEditAction: true
  }
};
