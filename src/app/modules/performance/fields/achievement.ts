import {DataAttr, DataField, DataType} from '@er/types';
import {DICT_CODES} from '../../commons/dict-code';

export const Achievement = {
  name: 'achievement',
  apiEntry: 'performance-achievement',
  label: '业绩考核',
  fields: {
    // ...OrgEmpRef,
    achievementType: <DataField>{
      key: 'achievementType',
      label: '业绩类型',
      dataAttr: DataAttr.DATA_CODE,
      catCode: DICT_CODES.ACHIEVEMENT_TYPE.catCode,
      required: true
    },
    occurDate: <DataField>{
      key: 'occurDate',
      label: '业绩获取日期',
      dataType: DataType.DATE,
      required: true
    },
    createdDate: <DataField>{
      key: 'createdDate',
      label: '填写日期',
      dataType: DataType.DATE,
      required: true
    },
    amount: <DataField>{
      key: 'amount',
      label: '金额',
      dataAttr: DataAttr.CURRENCY,
      required: true
    }
  }
};
