import {ApiUtils} from '@er/core';
import {ApiPayload, Order} from '@er/types';
import {CommonsUtils, DialogUtils} from '@er/utils';
import * as esb from 'elastic-builder';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export interface NextCodeProps {
  apiEntry?: string;
  parentKey?: string;
  parentCode?: string;
  codeKey?: string;
  codeLen?: number;
}

export class DataCodeUtils {
  static DEFAULT_ROOT_CODE = '001';

  static DEFAULT_OPTIONS: NextCodeProps = {
    parentKey: 'parent.code',
    codeKey: 'code',
    codeLen: 3
  };

  static getNextCode(options: NextCodeProps): Observable<any> {
    const opt: NextCodeProps = CommonsUtils.defaults(options || {}, DataCodeUtils.DEFAULT_OPTIONS);
    const q = opt.parentCode ? esb.termQuery(opt.parentKey, opt.parentCode) : esb.matchAllQuery();
    return ApiUtils.getByQuery(`${opt.apiEntry}`, <ApiPayload>{
      query: q,
      sort: {[opt.codeKey]: Order.DESC},
      size: 1
    }).pipe(
      map((data: any) => {
        const prefix = '0'.repeat(opt.codeLen);
        if (data.total !== 0) {
          const last = data.items[0];
          if (last[opt.codeKey]) {
            const next = parseInt(last[opt.codeKey].replace(/^0+/, '')) + 1;
            return (prefix + next).slice(-prefix.length);
          } else {
            DialogUtils.error('错误', '无法生成新代码');
          }
        }
        return (prefix + 1).slice(-prefix.length);
      })
    );
  }
}
