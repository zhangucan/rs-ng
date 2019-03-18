import {AuthUtils} from '@er/core';
import {PngFormlyTypes} from '@er/formly-primeng';
import {PngAutoCompleteProps} from '@er/primeng';
import {ApiDataProps} from '@er/types';
import {CommonsUtils, DialogUtils} from '@er/utils';
import * as esb from 'elastic-builder';
import {DATA_CODE_TYPE} from '../data-code';

export * from './district';
export * from './menu';
export * from './org';
export * from './employee';
export * from './role';

export const typePermission = (typeField = 'type') => {
  return {
    method: (ctx) => AuthUtils.getCurrentUser().isSu
      || !ctx.row[typeField]
      || ctx.row[typeField].code !== DATA_CODE_TYPE.SYS
  };
};

export const distinctSuggest = (apiEntry, fieldName, query?, selectable = false) => {
  return <PngAutoCompleteProps>{
    type: PngFormlyTypes.autoComplete,
    props: <PngAutoCompleteProps>{
      minLength: 1,
      size: 5,
      forceSelection: false,
      dropdown: false,
      placeholder: '请输入唯一的代码值',
      onSelect: (ctx) => {
        if (!selectable) {
          DialogUtils.error('无效操作', '该值已经存在，不能选择');
          setTimeout(() => ctx.field.formControl.reset());
        }
      },
      $ext: {
        apiDataProps: <ApiDataProps>{
          apiEntry: apiEntry,
          query: query,
          searchFields: fieldName,
          withTerm: true
        },
        dataItemProps: {
          template: item => `<span title="该值已经存在，不可用"><del>${item[fieldName]}</del></span> `
        }
      }
    },
    templateOptions: {
      required: false,
      description: '内容必须唯一，可以不填，不填时系统自动生成'
    }
  };
};

export const resetFieldsApiProps = (formlyForm, value, queryField, fields: string | string[]) => {
  const components = [];
  fields = CommonsUtils.getArrayValue(fields);
  fields.forEach(field => {
    components.push(formlyForm.getFormComponent(field));
  });
  if (value) {
    components.forEach(component => {
      component.apiDataProps.query = esb.termQuery(queryField, value);
    });
  } else {
    components.forEach(component => {
      component.apiDataProps.query = esb.matchNoneQuery();
    });
  }
};

