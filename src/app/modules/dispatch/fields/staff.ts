import {DataAttr, DataField, DataType} from '@er/types';
import {DICT_CODES} from '../../commons/dict-code';

export const Staff = {
  key: 'staff',
  label: '派遣员工',
  defaultKey: 'name',
  fields: {
    name: <DataField>{
      key: 'name',
      label: '姓名',
      required: true
    },
    gender: <DataField>{
      key: 'gender',
      label: '性别',
      dataType: DataType.STRING,
      dataAttr: DataAttr.DATA_CODE,
      catCode: DICT_CODES.GENDER.catCode
    },
    idCard: <DataField>{
      key: 'idCard',
      label: '身份证号',
      dataAttr: DataAttr.ID_CARD
    },
    phone: <DataField>{
      key: 'phone',
      label: '手机号码',
      dataAttr: DataAttr.PHONE
    }
  }
};
