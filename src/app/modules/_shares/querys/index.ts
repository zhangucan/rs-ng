import * as esb from 'elastic-builder';

export const IN_USE_QUERY = esb.boolQuery().mustNot(esb.termQuery('inUse', false));

export const IS_CURRENT_QUERY = esb.termQuery('isCurrent', true);
