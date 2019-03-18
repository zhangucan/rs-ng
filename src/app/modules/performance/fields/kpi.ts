import {DataAttr, DataField, DataType} from '@er/types';
import {KPI} from '@shares';

export const Kpi = {
  name: 'kpi',
  label: 'kpi考核',
  apiEntry: 'performance-kpi',
  fields: {
    kpiType: {
      key: 'kpiType',
      label: '指标类型',
      dataAttr: DataAttr.DATA_CODE,
      catCode: KPI.catCode,
      required: true
    },
    isCash: <DataField>{
      key: 'isCash',
      label: '现金扣款',
      dataType: DataType.BOOLEAN,
      required: true
    },
    occurDate: <DataField>{
      key: 'occurDate',
      label: '考核日期',
      dataType: DataType.DATE,
      required: true
    },
    describe: <DataField>{
      key: 'describe',
      label: '情况说明',
      dataAttr: DataAttr.TEXT,
      required: true
    },
    amount: <DataField>{
      key: 'amount',
      label: '金额',
      dataAttr: DataAttr.CURRENCY,
      defaultValue: 20,
      required: true
    },
    createdDate: <DataField>{
      key: 'createdDate',
      label: '填写日期',
      dataType: DataType.DATE,
      required: true
    }
  }
};
