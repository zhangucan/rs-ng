import {ApiDataProps, DataField, DataType} from '@er/types';
import {DataCodeCat} from '@sys/data-code-cat';

export const codeCatRef = <DataField>{
  key: 'catCode',
  label: '大类',
  required: true,
  sortKey: `catCode.code`,
  dataType: DataType.JSON,
  apiDataProps: <ApiDataProps>{
    apiEntry: DataCodeCat.apiEntry,
    searchFields: DataCodeCat.fields.name.key,
    returnFields: [DataCodeCat.fields.name.key, DataCodeCat.fields.code.key],
    sort: [DataCodeCat.fields.displayOrder.key, DataCodeCat.fields.code.key],
    size: 10
  },
  dataItemProps: {
    labelKey: DataCodeCat.fields.name.key,
    valueKey: [DataCodeCat.fields.code.key, DataCodeCat.fields.name.key],
    template: item => {
      return `<span><b>${item.name}</b></span> <span class="badge badge-success"> ${item.code}</span> `;
    }
  },
  defaultKey: DataCodeCat.fields.name.key,
  refer: {
    code: {key: DataCodeCat.fields.name.key, label: '类别代码'},
    name: {key: DataCodeCat.fields.code.key, label: '类别名'}
  },
  description: '代码所属的代码类型'
};
