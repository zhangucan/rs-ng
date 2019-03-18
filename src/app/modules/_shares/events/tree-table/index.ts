import {ApiPayload} from '@er/types';
import {CommonsUtils, StatesUtils} from '@er/utils';
import * as esb from 'elastic-builder';
import {Query} from 'elastic-builder';

export function onNodeSelect(event, keyOrQuery: string | Query | Query[]) {
  const treeProps = event['$from'].$props;
  const tableId = CommonsUtils.get(treeProps, '$ext.$container.table.$id');
  if (tableId) {
    let q = keyOrQuery;
    const nodeCode = event.node.data && event.node.data.code;
    if (nodeCode && CommonsUtils.isString(keyOrQuery)) {
      q = esb.prefixQuery(<string>keyOrQuery, nodeCode);
    }
    StatesUtils.update(tableId, <ApiPayload>{
      query: nodeCode ? q : esb.matchAllQuery()
    });
  }
}
