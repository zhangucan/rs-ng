import {DataField, DataType} from '@er/types';
import {TeamRef} from '../../commons/refer';

export const Rate = {
  name: 'salaryRate',
  label: '员工提成',
  apiEntry: 'salary-rate',
  fields: {
    team: TeamRef,
    month: <DataField>{
      key: 'month',
      label: '月份',
      dataType: DataType.DATE,
      required: true,
    },
    managerRate: <DataField>{
      key: 'managerRate',
      label: '经理提成比例系数',
      dataType: DataType.NUMBER,
      required: true,
      min: 0,
    },
    groupleaderRate: <DataField>{
      key: 'groupleaderRate',
      label: '主管提成比例系数',
      dataType: DataType.NUMBER,
      required: true,
      min: 0,
    },
    staffRate: <DataField>{
      key: 'staffRate',
      label: '员工提成比例系数',
      dataType: DataType.NUMBER,
      required: true,
      min: 0,
    },
  },
};
