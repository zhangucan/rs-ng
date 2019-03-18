import {AuthUtils} from '@er/core';
import {PngTreeProps} from '@er/primeng';
import {ApiDataProps, ApiPayload, DataItemProps} from '@er/types';
import {CommonsUtils, StatesUtils} from '@er/utils';
import * as esb from 'elastic-builder';
import {Query} from 'elastic-builder';
import {TreeNode} from 'primeng/api';
import {MAX_SIZE, ORG_LEAF_TYPE_QUERY, ORG_TYPE_CODE, ORG_TYPE_CODE_KEY, ORG_TYPE_KEY} from '../constants';
import {ROLE} from '../constants/role';

export interface DataTree {
  caption?: string;
  root?: string | TreeNode;
  apiProps?: ApiDataProps;
  itemProps?: DataItemProps;
  queryOrRelatedKey?: string | Query;
  treeProps?: PngTreeProps;
}

export class DataTreeUtils {
  static DEFAULT_TREE_OPTIONS: DataTree = {
    apiProps: <ApiDataProps>{
      apiEntry: 'sys-org'
    },
    itemProps: <DataItemProps>{
      idKey: 'code',
      parentKey: 'parent',
      labelKey: 'name',
      levelIdLength: 3,
      typeKey: 'orgType'
    },
    queryOrRelatedKey: 'parent.code',
    caption: '组织架构'
  };
  static orgTreeNodeSelectHandler = (event) => {
    const orgType = CommonsUtils.get(event, `node.data.${ORG_TYPE_CODE_KEY}`);
    switch (orgType) {
      case ORG_TYPE_CODE.CORP:
        DataTreeUtils.dispatchEvent(event, 'dept.code'); // maybe no corp
        break;
      case ORG_TYPE_CODE.DEPT:
        DataTreeUtils.dispatchEvent(event, 'dept.code');
        break;
      case ORG_TYPE_CODE.TEAM:
        DataTreeUtils.dispatchEvent(event, 'team.code');
        break;
      case ORG_TYPE_CODE.GROUP:
        DataTreeUtils.dispatchEvent(event, 'group.code');
        break;
      default:
        DataTreeUtils.dispatchEvent(event, 'org.code');
        break;
    }
  };

  static userOrgTree(leafOrgType?, treeProps?) {
    return DataTreeUtils.buildTreeProps({
      ...DataTreeUtils.getRoleBasedTreeProps(leafOrgType),
      ...(treeProps || {})
    });
  }

  static buildTreeProps(options?: DataTree): PngTreeProps {
    const treeOptions: DataTree = CommonsUtils.defaults({}, options || {}, DataTreeUtils.DEFAULT_TREE_OPTIONS);
    const props = CommonsUtils.merge(
      <PngTreeProps>{
        selectionMode: 'single',
        onNodeSelect: event => DataTreeUtils.dispatchEvent(event, treeOptions.queryOrRelatedKey),
        $ext: {
          virtualRoot: treeOptions.root,
          apiDataProps: <ApiDataProps>{
            ...treeOptions.apiProps,
            size: MAX_SIZE,
            sort: [ORG_TYPE_CODE_KEY, 'code']
          },
          dataItemProps: treeOptions.itemProps,
          caption: treeOptions.caption,
          collapsedIcon: {
            method: node => {
              if (!node.data) {
                return;
              }
              const orgType = node.data[ORG_TYPE_KEY] && node.data[ORG_TYPE_KEY].code;
              if (node.data['code'] === '001') {
                return 'root';
              } else if (orgType === ORG_TYPE_CODE.CORP) {
                return 'corp';
              } else if (orgType === ORG_TYPE_CODE.DEPT) {
                return 'dept';
              } else if (orgType === ORG_TYPE_CODE.TEAM) {
                return 'team';
              } else if (orgType === ORG_TYPE_CODE.GROUP) {
                return 'group';
              }
            }
          },
          expandedIcon: {
            method: node => {
              if (!node.data) {
                return;
              }
              const orgType = node.data[ORG_TYPE_KEY] && node.data[ORG_TYPE_KEY].code;
              if (node.data['code'] === '001') {
                return 'root';
              } else if (orgType === ORG_TYPE_CODE.CORP) {
                return 'corp';
              } else if (orgType === ORG_TYPE_CODE.DEPT) {
                return 'dept';
              } else if (orgType === ORG_TYPE_CODE.TEAM) {
                return 'team ';
              } else if (orgType === ORG_TYPE_CODE.GROUP) {
                return 'group';
              }
            }
          }
        }
      },
      treeOptions.treeProps || {}
    );
    return props;
  }

  static getRoleBasedTreeProps(lastOrgType): DataTree {
    let roles = AuthUtils.getCurrentUser() && AuthUtils.getCurrentUser().roles;
    roles = CommonsUtils.getArrayValue(roles) || [];
    let props;
    if (
      roles.indexOf(ROLE.codes.SENIOR) >= 0 ||
      roles.indexOf(ROLE.codes.DIRECTOR) >= 0
    ) {
      props = {
        apiProps: {
          query: ORG_LEAF_TYPE_QUERY[lastOrgType]
        }
      };
    } else if (roles.indexOf(ROLE.codes.MANAGER) >= 0) {
      props = {
        apiProps: {
          query: [
            esb.prefixQuery('code', AuthUtils.getCurrentUser().dept['code']),
            ORG_LEAF_TYPE_QUERY[lastOrgType]
          ]
        },
        root: {label: '管辖部门'}
      };
    } else if (roles.indexOf(ROLE.codes.LEADER) >= 0) {
      props = {
        apiProps: {
          query: [
            esb.prefixQuery('code', AuthUtils.getCurrentUser().team['code']),
            ORG_LEAF_TYPE_QUERY[lastOrgType]
          ]
        },
        root: {label: '管辖项目组'}
      };
    } else if (roles.indexOf(ROLE.codes.HEADER) >= 0) {
      props = {
        apiProps: {
          query: [
            esb.prefixQuery('code', AuthUtils.getCurrentUser().group['code']),
            ORG_LEAF_TYPE_QUERY[lastOrgType]
          ]
        },
        root: {label: '管辖小组'}
      };
    } else {
      props = {
        apiProps: {
          query: esb.matchNoneQuery()
        }
      };
    }
    if (!props.treeProps || !props.treeProps.onNodeSelect) {
      props.treeProps = props.treeProps || {};
      props.treeProps.onNodeSelect = event =>
        DataTreeUtils.dispatchEvent(
          event,
          esb
            .boolQuery()
            .should([
              esb.termQuery(DataTreeUtils.DEFAULT_TREE_OPTIONS.itemProps.idKey, event.node.data.code),
              esb.prefixQuery(DataTreeUtils.DEFAULT_TREE_OPTIONS.queryOrRelatedKey as string, event.node.data.code)
            ])
        );
    }
    return props;
  }

  static getSelectedTreeState(formlyForm) {
    const tableId = formlyForm['tableId'];
    const table = tableId && StatesUtils.getValue(tableId);
    if (table && table.component) {
      const treeId = CommonsUtils.get(table.component, '$props.$ext.$container.tree.$id');
      const treeState = StatesUtils.getValue(treeId);
      return treeState;
    }
  }

  static getSelectedNode(formlyForm): TreeNode {
    const treeState = DataTreeUtils.getSelectedTreeState(formlyForm);
    return treeState && treeState['selectedNode'];
  }

  static getSelectedNodeValue(formlyForm): {}[] {
    const treeState = DataTreeUtils.getSelectedTreeState(formlyForm);
    return treeState && treeState['selectedNodeValue'];
  }

  private static dispatchEvent(event, keyOrQuery) {
    const treeProps = event['$from'].$props;
    const tableId = CommonsUtils.get(treeProps, '$ext.$container.table.$id');
    if (tableId) {
      let q = keyOrQuery;
      const nodeCode = event.node.data && event.node.data.code;
      if (nodeCode && CommonsUtils.isString(keyOrQuery)) {
        q = esb.prefixQuery(keyOrQuery, nodeCode);
      }
      StatesUtils.update(tableId, <ApiPayload>{
        query: nodeCode ? q : esb.matchAllQuery()
      });
    }
  }
}
