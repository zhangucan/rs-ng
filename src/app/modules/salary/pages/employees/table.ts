import {PngTableColumnProps, PngTableProps} from '@er/primeng';
import {DataAttr} from '@er/types';
import {Salary} from '../../fields/salary';
import {CaptionComponent} from './caption';

export const table = <PngTableProps>{
  entity: Salary,
  scrollable: true,
  columns: <PngTableColumnProps[]>[
    {
      // dataField: Fruit.fields.employee,
      key: 'employee',
      label: '姓名',
      frozen: true,
      width: '100px',
      styleClass: 'bg-gray white'
    },
    {
      dataField: Salary.fields.team,
      label: '项目'
    },
    {
      dataField: Salary.fields.staffPosition,
      label: '职级'
    },
    {
      dataField: Salary.fields.start,
      dataAttr: DataAttr.CURRENCY
    },
    {
      dataField: Salary.fields.end,
      dataAttr: DataAttr.CURRENCY
    },
    {
      dataField: Salary.fields.should
    },
    {
      dataField: Salary.fields.acture
    },
    {
      dataField: Salary.fields.incoming,
      dataAttr: DataAttr.CURRENCY
    },
    {
      dataField: Salary.fields.cost
    },
    {
      dataField: Salary.fields.profit,
      dataAttr: DataAttr.CURRENCY
    },
    {
      dataField: Salary.fields.commissionRate
    },

    {
      dataField: Salary.fields.commission
    },
    {
      dataField: Salary.fields.loss,
      dataAttr: DataAttr.CURRENCY
    },
    {
      dataField: Salary.fields.staffSalary,
      dataAttr: DataAttr.CURRENCY
    },
    {
      dataField: Salary.fields.staffLaborCost,
      dataAttr: DataAttr.CURRENCY
    },

    {
      dataField: Salary.fields.managementDailyCost,
      dataAttr: DataAttr.CURRENCY
    },
    {
      dataField: Salary.fields.deductionInCash
    },
    {
      dataField: Salary.fields.deptDailyCost
    },
    {
      dataField: Salary.fields.fullSalary
    },

    {
      dataField: Salary.fields.minMonthlySalary,
      dataAttr: DataAttr.CURRENCY
    },
    {
      dataField: Salary.fields.minSalary,
      dataAttr: DataAttr.CURRENCY
    },

    {
      dataField: Salary.fields.salary,
      dataAttr: DataAttr.CURRENCY,
      width: '200px'
    }
  ],
  $ext: {
    caption: {
      type: CaptionComponent
    }
  }
};
