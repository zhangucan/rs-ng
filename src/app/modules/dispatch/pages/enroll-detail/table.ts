import {PngTableColumnProps, PngTableProps} from '@er/primeng';
import {EnrollDetail} from '../../fields/enroll-detail';

export const table = <PngTableProps>{
  entity: EnrollDetail,
  columns: <PngTableColumnProps[]>[
    {
      dataField: EnrollDetail.fields.employer
    },
    {
      dataField: EnrollDetail.fields.portion
    },
    {
      dataField: EnrollDetail.fields.staff
    }
  ],
  $ext: {
    hasAddAction: true,
    hasDeleteAction: true,
    hasEditAction: true,
    hasAuditAction: true,
    rowExpandable: true
  }
};
