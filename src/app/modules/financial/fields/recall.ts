import {DataField, DataType} from '@er/types';

export const Recall = {
  name: 'financialRecall',
  apiEntry: 'financial-recall',
  label: '划回',
  fields: {
    staff: {
      key: 'staff',
      label: '入职人员'
    },
    dismissDate: <DataField>{
      key: 'dismissDate',
      label: '离职日期',
      dataType: DataType.DATE,
      required: true
    },
    createDate: <DataField>{
      key: 'createDate',
      label: '创建日期',
      dataType: DataType.DATE,
      required: true
    },
  },
};
