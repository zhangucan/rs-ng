import {DataField, DataType} from '@er/types';
import {OrgBase} from '../../org/base';

const entity = {
  key: 'recruitEmployer',
  label: '入职单位',
  apiEntry: 'recruit-employer'
};

export const Employer = {
  ...entity,
  fields: {
    name: {
      ...OrgBase.fields.name,
      label: '招聘单位名称'
    },
    inUse: <DataField> {
      key: 'inUse',
      label: '启用状态',
      dataType: DataType.BOOLEAN,
      defaultValue: true
    }
  }
};
