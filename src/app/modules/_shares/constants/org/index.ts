import * as esb from 'elastic-builder';

export const ORG_TYPE_KEY = 'orgType';

export const ORG_ID_KEY = 'orgId';

export const ORG_TYPE_CODE_KEY = 'orgType.code';

export const ORG_TYPE_CAT_CODE = '002';

export const ORG_CHANGE_TYPE_CAT_CODE = '008';

export const ORG_TYPE_CODE = {
  CORP: '001',
  DEPT: '002',
  TEAM: '003',
  GROUP: '004',

  ALL: '_all'
};

export const ORG_LEAF_TYPE_QUERY = {
  '001': esb.matchNoneQuery(),
  '002': esb.boolQuery().should([
    esb.termQuery(ORG_TYPE_CODE_KEY, ORG_TYPE_CODE.CORP)
  ]),
  '003': esb.boolQuery().should([
    esb.termQuery(ORG_TYPE_CODE_KEY, ORG_TYPE_CODE.CORP),
    esb.termQuery(ORG_TYPE_CODE_KEY, ORG_TYPE_CODE.DEPT)
  ]),
  '004': esb.boolQuery().should([
    esb.termQuery(ORG_TYPE_CODE_KEY, ORG_TYPE_CODE.CORP),
    esb.termQuery(ORG_TYPE_CODE_KEY, ORG_TYPE_CODE.DEPT),
    esb.termQuery(ORG_TYPE_CODE_KEY, ORG_TYPE_CODE.TEAM)
  ]),

  '_all': esb.matchAllQuery()
};
