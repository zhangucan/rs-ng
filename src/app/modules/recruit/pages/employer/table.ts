import {PngTableColumnProps, PngTableProps} from '@er/primeng';
import {DataAttr} from '@er/types';
import {Employer} from '../../fields/employer';

export const table = <PngTableProps>{
  entity: Employer,
  columns: <PngTableColumnProps[]>[
    {
      dataField: Employer.fields.name,
      dataAttr: DataAttr.TAG
    },
    {
      dataField: Employer.fields.inUse,
      dataAttr: DataAttr.TAG
    }
  ],
  $ext: {
    hasAddAction: true,
    hasDeleteAction: true,
    hasEditAction: true
  }
};
