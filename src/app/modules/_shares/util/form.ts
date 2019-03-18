import {ApiUtils} from '@er/core';
import {PngFormlyTypes} from '@er/formly-primeng';
import {PngAutoCompleteProps} from '@er/primeng';
import {ApiDataProps, ApiPayload} from '@er/types';
import {DialogUtils} from '@er/utils';
import * as esb from 'elastic-builder';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

export class FormUtils {

  static distinctSuggest(apiEntry, fieldName, query?, selectable = false) {
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
      }
    };
  }

  static checkDistinct(apientry, fieldName, value, id?, q?): Observable<boolean> {
    return ApiUtils.getByQuery(apientry, <ApiPayload>{
      query: q ? q : esb.termQuery(fieldName, value),
      fields: fieldName,
      size: 2
    })
      .pipe(
        map(data => data.items.length === 0
          || (data.items.length === 1 && data.items[0]['id'] === id)),
        tap(distinct => {
          if (!distinct) {
            DialogUtils.error('验证失败', `数值【${value}】已经存在，请修改后再执行本操作！`);
          }
        })
      );
  }
}
