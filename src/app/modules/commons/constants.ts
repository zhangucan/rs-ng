import * as esb from 'elastic-builder';

export const CONSTANTS = {
  MAX_SIZE: 999,
  ORG_TYPE: {
    CORP: 2,
    DEPT: 3,
    TEAM: 4,
    GROUP: 5,
    ALL: 100
  },
  IN_USE_QUERY: esb.boolQuery().mustNot(esb.termQuery('inUse', false)),
  OVERLAY_COLUMN_PROPS: {
    sortable: false,
    filterable: false,
    aggable: false
  },
  OVERLAY_TABLE_PROPS: {
    alwaysShowPaginator: false,
    scrollable: true,
    scrollWidth: '800px',
    paginatorPosition: 'bottom'
  }
};
