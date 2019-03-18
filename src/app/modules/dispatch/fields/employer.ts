import {ApiDataProps, DataAttr, DataField, DataType} from '@er/types';
import {Competitors} from './competitor';

export const Employer = {
  key: 'dispatchEmployer',
  label: '派遣单位',
  apiEntry: 'dispatch-employer',
  fields: {
    name: <DataField>{
      key: 'name',
      label: '名称',
      required: true,
      placeholder: '请输入单位名称'
    },
    competitors: <DataField>{
      key: 'competitors',
      label: '竞争对手',
      dataType: DataType.List,
      apiDataProps: <ApiDataProps>{
        apiEntry: Competitors.apiEntry,
        searchFields: Competitors.fields.name.key,
        returnFields: Competitors.fields.name.key
      },
      dataItemProps: {
        valueKey: Competitors.fields.name.key,
        template: (item) => `<span class="badge badge-info">${item[Competitors.fields.name.key]}</span>`
      },
      placeholder: '该项目的所有竞争对手'
    },
    contact: <DataField>{
      key: 'contact',
      label: '联系人',
      placeholder: '请输入联系人姓名'
    },
    phone: <DataField>{
      key: 'phone',
      label: '联系电话',
      dataAttr: DataAttr.PHONE,
      placeholder: '请输入联系人电话'
    },
    city: <DataField>{
      key: 'city',
      label: '所在城市',
      placeholder: '请输入单位所在城市'
    },
    address: <DataField>{
      key: 'address',
      label: '地址',
      placeholder: '请输入单位地址'
    },
    inUse: <DataField>{
      key: 'inUse',
      label: '启用状态',
      dataType: DataType.BOOLEAN,
      defaultValue: true
    }
  }
};
