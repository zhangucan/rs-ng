import {DataAttr, DataField} from '@er/types';

export const DEGREE_FIELD = <DataField>{
  key: 'degree',
  label: '最高学历',
  required: true,
  dataAttr: DataAttr.DATA_CODE,
  catCode: '090'
};
