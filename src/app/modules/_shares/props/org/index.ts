import {AuthUtils} from '@er/core';
import {PngFormlyTypes, PngFormlyWrappers} from '@er/formly-primeng';
import {PngTreeProps} from '@er/primeng';
import {ApiDataProps, DataItemProps} from '@er/types';
import {CommonsUtils} from '@er/utils';
import * as esb from 'elastic-builder';
import {IS_CURRENT_KEY, MAX_SIZE, ORG_TYPE_CODE, ORG_TYPE_KEY} from '../../constants';
import {ORG_API_ENTRY} from '../../fields/org';
import {DataTreeUtils} from '../../util/tree';

const orgTemplate = (field) => {
  let tpl;
  let model = field && field.formlyForm.model;
  if (!model || (CommonsUtils.isEmpty(model && model['org']) && !model['dept'])) {
    return;
  } else {
    if (!CommonsUtils.isEmpty(model['org'])) {
      model = model['org'];
    }
    if (model) {
      tpl = '';
      if (model['corp']) {
        tpl += `<span class="ml-2 badge badge-success" title="公司"> ${model['corp']['name']}</span>`;
      }
      if (model['dept']) {
        tpl += `<span class="ml-2 badge badge-primary" title="部门"> ${model['dept']['name']}</span>`;
      }
      if (model['team']) {
        tpl += `<span class="ml-2 badge badge-warning" title="项目组"> ${model['team']['name']}</span>`;
      }
      if (model['group']) {
        tpl += `<span class="ml-2 badge badge-danger" title="小组">${model['group']['name']}</span>`;
      }
      tpl += '</div';
    }
  }
  const orgField = field.formProps.fields.filter(f => f.key === 'org');
  orgField[0].templateOptions.panel.collapsed = true;
  tpl = `
        <div class="alert alert-info">
          <div class="my-1"><i class="fa fa-info-circle text-success fa-2x"></i> 该员工当前所属组织：</div> 
          <div>
             ${tpl}
          </div>
       </div> 
       `;
  return tpl;
};

function orgTreeNodeValueParser(nodeValue) {
  let parsed = {};
  if (!CommonsUtils.isEmpty(nodeValue)) {
    (nodeValue as {}[]).forEach(node => {
      if (node['orgType'] && node['orgType']) {
        switch (node['orgType'].code) {
          case ORG_TYPE_CODE.CORP:
            parsed['corp'] = {
              name: node['name'],
              code: node['code']
            };
            break;
          case ORG_TYPE_CODE.DEPT:
            parsed['dept'] = {
              name: node['name'],
              code: node['code']
            };
            break;
          case ORG_TYPE_CODE.TEAM:
            parsed['team'] = {
              name: node['name'],
              code: node['code']
            };
            break;
          case ORG_TYPE_CODE.GROUP:
            parsed['group'] = {
              name: node['name'],
              code: node['code']
            };
            break;
        }
      }
    });
    const leaf = nodeValue[nodeValue.length - 1];
    parsed = {
      ...parsed,
      leafOrg: {
        name: leaf['name'],
        code: leaf['code']
      }
    };
  }
  return parsed;
}

export const ORG_TREE_SELECTOR = [
  {
    type: PngFormlyTypes.dyna,
    props: {
      content: field => {
        return field && orgTemplate(field);
      }
    },
    templateOptions: {
      hideLabel: true
    },
    hideExpression: (field) => !field['org']
  },
  {
    key: 'org',
    wrappers: [PngFormlyWrappers.pngPanelWrapper],
    type: PngFormlyTypes.tree,
    props: DataTreeUtils.buildTreeProps({
      treeProps: {
        style: {'max-height.px': 200, 'max-width.px': 750, 'overflow': 'auto'},
        selectionMode: 'single',
        $ext: {
          selectable: {
            method: (node) => !node['children']
          }
        }
      }
    }),
    parsers: orgTreeNodeValueParser,
    templateOptions: {
      label: '所在组织',
      panel: {
        header: '组织机构选择',
        icon: 'fa fa-institution'
      }
    }
  }
];

export const ORG_AUTO_COMPLETE = <PngTreeProps>{
  selectionMode: 'single',
  $ext: {
    caption: '组织机构',
    apiDataProps: <ApiDataProps>{
      apiEntry: ORG_API_ENTRY,
      query: esb.termQuery(IS_CURRENT_KEY, true),
      size: MAX_SIZE
    },
    dataItemProps: <DataItemProps>{
      idKey: 'code',
      orderKey: 'displayOrder',
      labelKey: 'name',
      levelIdLength: 3,
      typeKey: 'orgType'
    },
    collapsedIcon: {
      method: node => {
        if (!node.data) {
          return 'fa fa-folder';
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
        } else {
          return 'fa fa-folder';
        }
      }
    },
    expandedIcon: {
      method: node => {
        if (!node.data) {
          return 'fa fa-folder-open';
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
        } else {
          return 'fa fa-folder-open';
        }
      }
    }
  }
};

export function userOrgTreeProps() {
  return {
    ...ORG_AUTO_COMPLETE,
    $ext: {
      ...ORG_AUTO_COMPLETE.$ext,
      root: {label: '管辖机构', data: {code: AuthUtils.getCurrentUser().org['code']}},
      apiDataProps: {
        ...ORG_AUTO_COMPLETE.$ext.apiDataProps,
        query: esb.prefixQuery('code', AuthUtils.getCurrentUser().org['code'])
      }
    }
  };
}
