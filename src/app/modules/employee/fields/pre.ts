import {DataAttr, DataField, DataType} from '@er/types';
import {DateUtils} from '@er/utils';
import {CITY_FIELD, DEGREE_FIELD, EMPLOYEE_POST, ID_CARD_FIELD, MAJOR_FIELD, PHONE_FIELD, SCHOOL_FIELD} from '@shares';

export const PreEmployee = {
  key: 'pre-employee',
  label: ' 待入职员工',
  apiEntry: 'pre-employee',
  fields: {
    name: <DataField>{
      key: 'name',
      label: '姓名',
      dataType: DataType.STRING,
      placeholder: '请输入真实姓名',
      required: true
    },
    idCard: {
      ...ID_CARD_FIELD,
      required: true
    },
    phone: {
      ...PHONE_FIELD,
      required: true
    },
    currentAddress: <DataField>{
      key: 'currentAddress',
      label: '现居地址',
      dataType: DataType.STRING,
      required: true
    },
    idCardAddress: <DataField>{
      key: 'idCardAddress',
      label: '身份证地址',
      dataType: DataType.STRING
    },
    native: <DataField>{
      ...CITY_FIELD,
      key: 'native',
      label: '籍贯',
      sortKey: 'native.code',
      required: true
    },
    school: <DataField>{
      ...SCHOOL_FIELD,
      required: true
    },
    major: <DataField>{
      ...MAJOR_FIELD,
      required: true
    },
    degree: <DataField>{
      ...DEGREE_FIELD,
      required: true
    },
    graduationDate: <DataField>{
      key: 'graduationDate',
      label: '毕业时间',
      dataType: DataType.DATE,
      dataAttr: DataAttr.MONTH,
      required: true
    },
    stage: {
      key: 'stage',
      label: '当前阶段',
      dataType: DataType.NUMBER,
      defaultValue: 1
    },
    post1: {
      key: 'post1',
      label: '初试岗位',
      dataAttr: DataAttr.DATA_CODE,
      catCode: EMPLOYEE_POST.catCode,
      required: true
    },
    result1: {
      key: 'result1',
      label: '通过初试',
      dataType: DataType.BOOLEAN
    },
    occur1: {
      key: 'occur1',
      label: '初试时间',
      dataType: DataType.DATE,
      defaultValue: DateUtils.getDate()
    },
    note1: {
      key: 'note1',
      label: '初试情况说明',
      dataAttr: DataAttr.TEXT
    },

    post2: {
      key: 'post2',
      label: '复试岗位',
      dataAttr: DataAttr.DATA_CODE,
      catCode: EMPLOYEE_POST.catCode,
      required: true
    },
    result2: {
      key: 'result2',
      label: '通过复试',
      dataType: DataType.BOOLEAN
    },
    occur2: {
      key: 'occur2',
      label: '复试时间',
      dataType: DataType.DATE,
      defaultValue: DateUtils.getDate()
    },
    note2: {
      key: 'note2',
      label: '复试情况说明',
      dataAttr: DataAttr.TEXT
    },

    post3: {
      key: 'post3',
      label: '试岗岗位',
      dataAttr: DataAttr.DATA_CODE,
      catCode: EMPLOYEE_POST.catCode,
      required: true
    },
    result3: {
      key: 'result3',
      label: '通过试岗',
      dataType: DataType.BOOLEAN
    },
    note3: {
      key: 'note3',
      label: '试岗情况说明',
      dataAttr: DataAttr.TEXT
    }

  }
};
