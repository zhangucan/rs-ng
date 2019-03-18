import {ErFormlyFieldConfig, FormlyUtils} from '@er/formly';
import {UiLandscape} from '@er/types';
import {DateUtils} from '@er/utils';
import {IS_CURRENT_KEY, IS_CURRENT_QUERY, ORG_ID_KEY} from '@shares';
import * as esb from 'elastic-builder';
import {Org} from '../../fields/org';

export const form = {
  entity: Org,
  landscape: UiLandscape.horizontal,
  fields: <ErFormlyFieldConfig[]>[
    {
      dataField: Org.fields.parent
    },
    {
      dataField: Org.fields.code,
      templateOptions: {
        disabled: true,
        description: '由系统自动管理'
      },
      hideExpression: (model) => !model['code']
    },
    {
      dataField: Org.fields.name
    },
    {
      dataField: Org.fields.orgType
    },
    {
      dataField: Org.fields.displayOrder
    },
    {
      dataField: Org.fields.inUse
    }
  ],
  hooks: {
    onInit: formlyForm => {
      FormlyUtils.initFieldValueFromSelectedTreeNode(formlyForm, Org.fields.parent.key);
    }
  },
  beforeSubmit: (ctx) => {
    if (!ctx.model[ORG_ID_KEY]) {
      ctx.model[ORG_ID_KEY] = DateUtils.getStamp();
    }
    ctx.model[IS_CURRENT_KEY] = true;
    if (!ctx.model['code']) {
      return FormlyUtils.resolveDistinctFieldValue(ctx, Org, {
        query: [
          IS_CURRENT_QUERY,
          esb.termQuery('parent.code', ctx.model['parent']['code'])
        ],
        parent: ctx.model['parent']['code'],
        withParent: true
      });
    }
  },
  afterSubmit: (ctx) => FormlyUtils.refreshContainerNavTree(ctx)
};

