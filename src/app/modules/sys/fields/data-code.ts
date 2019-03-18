import {ApiDataProps, DataField, DataType} from '@er/types';
import {
  CODE_FIELD,
  COMMENT_FIELD,
  DATA_CODE_TYPE,
  DISPLAY_ORDER_FIELD,
  DISPLAY_ORDER_KEY,
  DROP_DOWN_ITEM_TPL,
  IN_USE_FIELD,
  NAME_FIELD,
  TYPE_FIELD
} from '@shares';
import {DataCodeCat} from '@sys/data-code-cat';

export const DataCode = {
  key: 'dataCode',
  label: '代码',
  apiEntry: 'sys-data-code',
  fields: {
    catCode: {
      key: 'catCode',
      label: '大类',
      required: true,
      sortKey: `catCode.code`,
      dataType: DataType.JSON,
      apiDataProps: <ApiDataProps>{
        apiEntry: DataCodeCat.apiEntry,
        searchFields: DataCodeCat.fields.name.key,
        returnFields: [DataCodeCat.fields.name.key, DataCodeCat.fields.code.key],
        sort: [DISPLAY_ORDER_KEY, DataCodeCat.fields.code.key]
      },
      dataItemProps: {
        labelKey: DataCodeCat.fields.name.key,
        valueKey: [DataCodeCat.fields.code.key, DataCodeCat.fields.name.key],
        ...DROP_DOWN_ITEM_TPL
      },
      defaultKey: DataCodeCat.fields.name.key,
      description: '代码所属的代码类型'
    },
    code: CODE_FIELD,
    name: NAME_FIELD,
    abbr: <DataField> {
      key: 'abbr',
      label: '简称'
    },
    displayOrder: DISPLAY_ORDER_FIELD,
    type: <DataField> {
      ...TYPE_FIELD,
      catCode: DATA_CODE_TYPE.catCode,
      description: '系统类型只有超级用户才能删除'
    },
    inUse: IN_USE_FIELD,
    comment: COMMENT_FIELD,
    parent: <DataField>{
      key: 'parent',
      label: '上级代码',
      description: '设置该代码所属的本级代码'
    }
  }
};
