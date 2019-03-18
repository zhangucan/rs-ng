import {PngTableColumnProps, PngTableProps} from '@er/primeng';
import {DataAttr} from '@er/types';
import * as esb from 'elastic-builder';
import {PreEmployee} from '../../fields/pre';

export const table = <PngTableProps>{
  entity: PreEmployee,
  caption: '初试员工信息浏览',
  columns: <PngTableColumnProps[]>[
    {
      dataField: PreEmployee.fields.name
    },
    {
      dataField: PreEmployee.fields.idCard,
      dataAttr: DataAttr.TAG
    },
    {
      dataField: PreEmployee.fields.result1,
      dataAttr: DataAttr.TAG
    },
    {
      dataField: PreEmployee.fields.school
    },
    {
      dataField: PreEmployee.fields.major
    },
    {
      dataField: PreEmployee.fields.degree,
      dataAttr: DataAttr.TAG
    }
  ],
  $ext: {
    apiDataProps: {
      query: [
        esb.termQuery(PreEmployee.fields.stage.key, 1)
      ]
    },
    hasAddAction: true,
    hasEditAction: true,
    hasDeleteAction: true,
    rowExpandable: true,
    hasSearchInput: true
  }
};
