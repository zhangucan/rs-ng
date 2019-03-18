import {DataAttr, DataField, DataType} from '@er/types';
import {EMPLOYEE_FIELD, TEAM_FIELD} from '@shares';

export const Profit = {
  name: 'financialProfit',
  label: '利润',
  apiEntry: 'financial-profit',
  fields: {
    team: TEAM_FIELD,
    month: <DataField>{
      key: 'month',
      label: '月份',
      dataType: DataType.DATE,
      required: true
    },
    incoming: <DataField>{
      key: 'incoming',
      label: '收入',
      dataAttr: DataAttr.CURRENCY,
      required: true,
    },
    teamCost: <DataField>{
      key: 'teamCost',
      label: '项目部门费用',
      dataAttr: DataAttr.CURRENCY,
      required: true,
    },
    manager: {
      ...EMPLOYEE_FIELD,
      key: 'manager',
      label: '经理'
    },
    commonCost: <DataField>{
      key: 'commonCost',
      label: '支出',
      dataAttr: DataAttr.CURRENCY,
      required: true,
    },
  },
};
