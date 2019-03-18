import {DataField} from '@er/types';
import {
  CODE_FIELD,
  COMMENT_FIELD,
  DATA_CODE_TYPE,
  DISPLAY_ORDER_FIELD,
  IN_USE_FIELD,
  NAME_FIELD,
  TYPE_FIELD
} from '@shares';

export const DataCodeCat = {
  key: 'dataCodeCat',
  label: '代码类别',
  apiEntry: 'sys-data-code-cat',
  fields: {
    code: CODE_FIELD,
    name: NAME_FIELD,
    displayOrder: DISPLAY_ORDER_FIELD,
    type: <DataField> {
      ...TYPE_FIELD,
      catCode: DATA_CODE_TYPE.catCode,
      description: '系统类型只有管理员才能删除'
    },
    comment: COMMENT_FIELD,
    inUse: IN_USE_FIELD
  }
};
