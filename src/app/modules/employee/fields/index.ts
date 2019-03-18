import {ApiDataProps, DataAttr, DataField, DataType} from '@er/types';
import {DateUtils} from '@er/utils';
import {
  CITY_FIELD,
  DEGREE_FIELD,
  DEPT_FIELD,
  DISPLAY_ORDER_FIELD,
  EMPLOYEE_API_ENTRY,
  EMPLOYEE_FIELD,
  EMPLOYEE_ID_KEY,
  EMPLOYEE_POST,
  EMPLOYEE_STATUS,
  EMPLOYEE_TITLE,
  GROUP_FIELD,
  ID_CARD_FIELD,
  IS_CURRENT_FIELD,
  MAJOR_FIELD,
  ORG_FIELD,
  PHONE_FIELD,
  SCHOOL_FIELD,
  TEAM_FIELD
} from '@shares';
import {PreEmployee} from './pre';

export const Employee = {
  key: 'employee',
  label: '员工',
  apiEntry: EMPLOYEE_API_ENTRY,
  fields: {
    isCurrent: IS_CURRENT_FIELD,
    displayOrder: DISPLAY_ORDER_FIELD,
    empId: <DataField>{
      key: EMPLOYEE_ID_KEY,
      label: '员工编号',
      dataType: DataType.STRING,
      dataAttr: DataAttr.DISTINCT
    },
    name: <DataField>{
      key: 'name',
      label: '姓名',
      dataType: DataType.STRING,
      placeholder: '请输入真实姓名'
    },
    org: ORG_FIELD,
    dept: DEPT_FIELD,
    team: TEAM_FIELD,
    group: GROUP_FIELD,
    leader: <DataField>{
      ...EMPLOYEE_FIELD,
      key: 'leader',
      label: '直接领导'
    },
    post: <DataField>{
      key: 'post',
      label: '岗位',
      dataAttr: DataAttr.DATA_CODE,
      catCode: EMPLOYEE_POST.catCode,
      required: true
    },
    title: <DataField>{
      key: 'title',
      label: '职级',
      dataAttr: DataAttr.DATA_CODE,
      catCode: EMPLOYEE_TITLE.catCode,
      defaultValue: EMPLOYEE_TITLE.employee,
      required: true
    },
    entryDate: <DataField>{
      key: 'entryDate',
      label: '入职时间',
      dataType: DataType.DATE,
      required: true,
      defaultValue: DateUtils.getDate()
    },
    leaveDate: <DataField>{
      key: 'leaveDate',
      label: '离职日期',
      dataType: DataType.DATE,
      required: true,
      defaultValue: DateUtils.getDate()
    },
    changeDate: <DataField>{
      key: 'changeDate',
      label: '异动时间',
      dataType: DataType.DATE,
      required: true
    },
    status: <DataField>{
      key: 'status',
      label: '员工状态',
      dataAttr: DataAttr.DATA_CODE,
      catCode: EMPLOYEE_STATUS.catCode,
      defaultValue: EMPLOYEE_STATUS.current
    },
    workplace: <DataField>{
      key: 'workplace',
      label: '工作属地',
      dataType: DataType.STRING,
      required: true
    },
    gender: <DataField>{
      key: 'gender',
      label: '性别',
      dataType: DataType.STRING,
      required: true
    },
    birthday: <DataField>{
      key: 'birthday',
      label: '生日',
      dataType: DataType.DATE,
      required: true
    },
    phone: <DataField>{
      ...PHONE_FIELD,
      required: true
    },
    idCard: <DataField>{
      ...ID_CARD_FIELD,
      apiDataProps: <ApiDataProps>{
        apiEntry: PreEmployee.apiEntry,
        searchFields: PreEmployee.fields.idCard.key,
        returnFields: [PreEmployee.fields.idCard.key, PreEmployee.fields.name.key],
        withPrefix: true
      },
      dataItemProps: {
        valueKey: PreEmployee.fields.idCard.key,
        template: item => `<span><b>${item[PreEmployee.fields.idCard.key]}</b></span> <span class="badge badge-success"> ${item[PreEmployee.fields.name.key]}</span> `
      },
      required: true
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
    currentAddress: <DataField>{
      key: 'currentAddress',
      label: '现居地址',
      dataType: DataType.STRING,
      required: true
    },
    idCardAddress: <DataField>{
      key: 'idCardAddress',
      label: '身份证地址',
      dataType: DataType.STRING,
      required: true
    },
    emergencyPhone: <DataField>{
      ...PHONE_FIELD,
      key: 'emergencyPhone',
      label: '紧急联系电话',
      required: true
    },
    emergencyPerson: {
      key: 'emergencyPerson',
      label: '紧急联系人'
    }
  }
};
