import {ApiDataProps, DataItemProps} from '@er/types';
import {Corp} from '@org/corp';

export const CorpRef = {
  key: 'corp',
  label: '公司',
  defaultKey: Corp.fields.name.key,
  apiDataProps: <ApiDataProps>{
    apiEntry: Corp.apiEntry,
    searchFields: Corp.fields.name.key,
    returnFields: [Corp.fields.name.key, Corp.fields.corpId.key, Corp.fields.parent.key]
  },
  dataItemProps: <DataItemProps>{
    labelKey: Corp.fields.name.key,
    valueKey: [Corp.fields.id.key, Corp.fields.name.key, Corp.fields.parent.defaultKey],
    template: item => {
      return `${item.name} (${item[Corp.fields.parent.defaultKey]})`;
    },
  },
};
