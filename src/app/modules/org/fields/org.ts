import {ApiDataProps, DataAttr, DataField, DataItemProps, DataType} from '@er/types';
import {DateUtils} from '@er/utils';
import {
  CODE_FIELD,
  DISPLAY_ORDER_FIELD,
  IN_USE_FIELD,
  IN_USE_QUERY,
  IS_CURRENT_FIELD,
  NAME_FIELD,
  ORG_API_ENTRY,
  ORG_CHANGE_TYPE_CAT_CODE,
  ORG_TYPE_CAT_CODE
} from '@shares';

export const Org = {
  key: 'org',
  apiEntry: ORG_API_ENTRY,
  label: '机构信息',
  fields: {
    code: CODE_FIELD,
    name: NAME_FIELD,
    parent: <DataField>{
      key: 'parent',
      label: '上级组织',
      dataType: DataType.JSON,
      defaultKey: 'name',
      apiDataProps: <ApiDataProps>{
        apiEntry: ORG_API_ENTRY,
        query: IN_USE_QUERY,
        searchFields: 'name',
        returnFields: ['name', 'code', 'parent'],
        sort: ['parent.code', 'code']
      },
      dataItemProps: <DataItemProps>{
        labelKey: 'name',
        valueKey: ['name', 'code'],
        template: item => {
          if (item['parent']) {
            return `${item['name']}&nbsp;<span class="badge badge-pill badge-primary">${
              item['parent']['name']
              }</span>`;
          } else {
            return `${item['name']}`;
          }
        }
      }
    },
    isCurrent: IS_CURRENT_FIELD,
    orgType: <DataField>{
      key: 'orgType',
      label: '组织类型',
      dataAttr: DataAttr.DATA_CODE,
      catCode: ORG_TYPE_CAT_CODE,
      required: true
    },
    changeDate: <DataField>{
      key: 'changeDate',
      label: '异动时间',
      dataType: DataType.DATE,
      dataAttr: DataAttr.DATE,
      required: true,
      defaultValue: DateUtils.getFormattedDate()
    },
    changeType: {
      key: 'changeType',
      label: '异动类型',
      dataAttr: DataAttr.DATA_CODE,
      catCode: ORG_CHANGE_TYPE_CAT_CODE
    },
    inUse: IN_USE_FIELD,
    displayOrder: DISPLAY_ORDER_FIELD
  }
};
