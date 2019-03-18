import {PngAutoCompleteProps} from '@er/primeng';
import * as esb from 'elastic-builder';

export const orgSelector = <PngAutoCompleteProps>{
  dropdown: true,
  $ext: {
    apiDataProps: {
      apiEntry: 'sys-org-*',
      searchFields: 'name',
      dataPath: 'items',
      returnFields: ['code', 'name', 'parent']
    },
    dataItemProps: {
      labelKey: 'name',
      valueKey: ['code', 'name'],
      template: item => {
        return `
                  <span>${item['name']}</span>&nbsp;
                  <span class="badge badge-pill badge-primary">${item['parent']['name']}</span>
                `;
      }
    }
  }
};

export const orgDynaFilter = (value) => esb.boolQuery().should([
  esb.prefixQuery('corp.code', value),
  esb.prefixQuery('dept.code', value),
  esb.prefixQuery('team.code', value),
  esb.prefixQuery('group.code', value)
]).minimumShouldMatch(1);
