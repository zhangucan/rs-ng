import {DataAttr, DataField, DataType} from '@er/types';
import {DIC_CAT_MAPPING} from 'src/app/modules/commons/mapping';

export const Settings = {
  name: 'salarySettings',
  label: '基本工资设置',
  apiEntry: 'salary-settings',
  fields: {
    title: <DataField>{
      key: 'title',
      label: '职级',
      dataAttr: DataAttr.DATA_CODE,
      catCode: DIC_CAT_MAPPING.ZJ.code,
    },
    post: <DataField>{
      key: 'post',
      label: '岗位',
      dataAttr: DataAttr.DATA_CODE,
      catCode: DIC_CAT_MAPPING.GW.code,
    },
    salary: <DataField>{
      key: 'salary',
      label: '基本工资',
      dataType: DataType.NUMBER,
      dataAttr: DataAttr.CURRENCY,
      required: true,
      defaultValue: 0,
    },
    rate: <DataField>{
      key: 'managerRate',
      label: '提成比例系数',
      dataType: DataType.NUMBER,
      required: true,
      min: 0,
    },
  },
};
