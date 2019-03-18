import {PngTableColumnProps, PngTableProps} from '@er/primeng';
import {DataAttr} from '@er/types';
import {PreEmployee} from '../../fields/pre';

export const table = <PngTableProps>{
  entity: PreEmployee,
  caption: '未入职员工信息浏览',
  columns: <PngTableColumnProps[]>[
    {
      dataField: PreEmployee.fields.name
    },
    {
      dataField: PreEmployee.fields.idCard,
      dataAttr: DataAttr.TAG
    },
    {
      dataField: PreEmployee.fields.native,
      hidden: true
    },
    {
      dataField: PreEmployee.fields.degree,
      hidden: true
    },
    {
      dataField: PreEmployee.fields.school,
      hidden: true
    },
    {
      dataField: PreEmployee.fields.major,
      hidden: true
    },
    {
      dataField: PreEmployee.fields.post1,
      hidden: true
    },
    {
      dataField: PreEmployee.fields.result1,
      hidden: true
    },
    {
      dataField: PreEmployee.fields.post2,
      hidden: true
    },
    {
      dataField: PreEmployee.fields.result2,
      hidden: true
    },
    {
      dataField: PreEmployee.fields.post3,
      hidden: true
    },
    {
      dataField: PreEmployee.fields.result3,
      hidden: true
    },
    {
      dataField: PreEmployee.fields.stage,
      dataAttr: DataAttr.TAG,
      cellContent: ctx => {
        const stage = ctx.row['stage'];
        const result1 = ctx.row['result1'];
        const result2 = ctx.row['result2'];
        const result3 = ctx.row['result3'];
        if (stage === 1) {
          return result1 ? '已初试' : '等待初试';
        } else if (stage === 2) {
          return result2 ? '已复试' : '等待复试';
        } else if (stage === 3) {
          return result3 ? '已试岗' : '等待试岗';
        }
        return '';
      }
    }
  ],
  $ext: {
    apiDataProps: {
      sort: [PreEmployee.fields.occur2.key, PreEmployee.fields.stage.key]
    },
    hasDeleteAction: true,
    rowExpandable: true,
    hasSearchInput: true
  }
};
