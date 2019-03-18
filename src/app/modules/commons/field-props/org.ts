import {PngFormlyTypes, PngFormlyWrappers} from '@er/formly-primeng';
import {CommonsUtils} from '@er/utils';
import {DataTreeUtils, ORG_TYPE_CODE, ORG_TYPE_KEY} from '@shares';

export function orgNodeValueParser(nodeValue) {
  const parsed = {};
  if (!CommonsUtils.isEmpty(nodeValue)) {
    (nodeValue as {}[]).forEach(node => {
      console.log(node);
      const orgTypeCode = node[ORG_TYPE_KEY] && node[ORG_TYPE_KEY].code;
      switch (orgTypeCode) {
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
    });
  }
  return parsed;
}

export const orgFields = [
  {
    type: PngFormlyTypes.dyna,
    props: {
      content: field => field && orgTemplate(field)
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
        selectionMode: 'single'
      }
    }),
    parsers: orgNodeValueParser,
    templateOptions: {
      label: '所在组织',
      panel: {
        header: '组织机构选择',
        icon: 'fa fa-institution'
      },
      before: {}
    }
  }
];

export const orgTemplate = (field) => {
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
          <div class="my-3"><i class="fa fa-info-circle text-success fa-2x"></i> 该员工当前所属组织：</div> 
          <div>
             ${tpl}
          </div>
       </div> 
       `;
  return tpl;
};
