import {ApiUtils} from '@er/core';
import {ErFormlyFieldConfig, FormlyUtils} from '@er/formly';
import {PngTableColumnProps, PngTableProps} from '@er/primeng';
import {
  ApiDataProps,
  DataAttr,
  DataField,
  DataItemProps,
  DataType,
  FormProps,
  Order,
  OverlayContext,
  OverlayType,
  UiLandscape
} from '@er/types';
import {DateUtils} from '@er/utils';
import {
  CODE_FIELD,
  DataTableUtils,
  IN_USE_FIELD,
  IN_USE_QUERY,
  NAME_FIELD,
  ORG_CHANGE_TYPE_CAT_CODE,
  ORG_ID_KEY,
  ORG_TYPE_CAT_CODE,
  ORG_TYPE_CODE_KEY
} from '@shares';
import * as esb from 'elastic-builder';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export const OrgBase = {
  apiEntry: 'sys-org',
  key: 'org',
  label: '机构信息',
  fields: {
    id: {
      key: 'id'
    },
    code: CODE_FIELD,
    name: NAME_FIELD,
    parent: <DataField>{
      key: 'parent',
      dataType: DataType.JSON,
      defaultKey: 'name'
    },
    isCurrent: <DataField>{
      key: 'isCurrent',
      label: '是否当前',
      dataType: DataType.BOOLEAN,
      defaultValue: true
    },
    orgType: {
      key: 'orgType',
      label: '组织类型',
      dataAttr: DataAttr.DATA_CODE,
      catCode: ORG_TYPE_CAT_CODE,
      required: true
    },
    changeDate: <DataField>{
      key: 'changeDate',
      label: '异动时间',
      dataType: DataType.DATE,
      dataAttr: DataAttr.DATE,
      required: true,
      defaultValue: DateUtils.getFormattedDate()
    },
    changeType: {
      key: 'changeType',
      label: '异动类型',
      dataAttr: DataAttr.DATA_CODE,
      catCode: ORG_CHANGE_TYPE_CAT_CODE
    },
    inUse: IN_USE_FIELD
  }
};

export const orgParentProps = function (apiEntry): {} {
  return {
    apiDataProps: <ApiDataProps>{
      apiEntry: apiEntry,
      query: IN_USE_QUERY,
      searchFields: OrgBase.fields.name.key,
      returnFields: [OrgBase.fields.name.key, OrgBase.fields.code.key, OrgBase.fields.parent.key],
      sort: [OrgBase.fields.parent.key, OrgBase.fields.code.key]
    },
    dataItemProps: <DataItemProps>{
      labelKey: OrgBase.fields.name.key,
      valueKey: [OrgBase.fields.name.key, OrgBase.fields.code.key],
      template: item => {
        if (item[OrgBase.fields.parent.key]) {
          return `${item[OrgBase.fields.name.key]}&nbsp;<span class="badge badge-pill badge-primary">${
            item[OrgBase.fields.parent.key][OrgBase.fields.name.key]
            }</span>`;
        } else {
          return `${item[OrgBase.fields.name.key]}`;
        }
      }
    }
  };
};

export const orgFormProps = (entity) => {
  return <FormProps>{
    entity: entity,
    landscape: UiLandscape.horizontal,
    fields: <ErFormlyFieldConfig[]>[
      {
        dataField: entity.fields.parent
      },
      {
        dataField: entity.fields.code
      },
      {
        dataField: entity.fields.name
      },
      {
        dataField: entity.fields.orgType
      },
      {
        dataField: entity.fields.inUse
      }
    ],
    hooks: {
      onInit: formlyForm =>
        FormlyUtils.initFieldValueFromSelectedTreeNode(formlyForm, OrgBase.fields.parent.key)
    },
    beforeSubmit: (ctx) => orgEditBeforeSubmit(ctx, entity),
    afterSubmit: (ctx) => FormlyUtils.refreshContainerNavTree(ctx)
  };
};

export function orgBeforeSubmit(entity) {
  return (ctx) => {
    if (ctx.formProps && ctx.formProps._action === 'move') {
      return orgChangeBeforeSubmit(ctx.model, entity);
    } else {
      return orgEditBeforeSubmit(ctx, entity);
    }
  };
}

export function orgChangeBeforeSubmit(model, entity): Observable<boolean> {
  return ApiUtils.patchById(entity.apiEntry, model['id'], {
    isCurrent: false
  }).pipe(
    map(_ => {
      model[OrgBase.fields.isCurrent.key] = true;
      delete model['id'];
      return true;
    })
  );
}

export function orgEditBeforeSubmit(ctx, entity) {
  if (!ctx.model[ORG_ID_KEY]) {
    ctx.model[ORG_ID_KEY] = DateUtils.getStamp();
  }
  if (!ctx.model['code']) {
    return FormlyUtils.resolveDistinctFieldValue(ctx, entity, {
      query: esb.termQuery('parent.code', ctx.model['parent']['code']),
      parent: ctx.model['parent']['code'],
      withParent: true
    });
  }
}

export const orgChangeFields = (entity) => {
  return <ErFormlyFieldConfig[]>[
    {
      dataField: entity.fields.changeDate
    },
    {
      dataField: entity.fields.changeType
    }
  ];
};

export const orgTableProps = (entity, orgTypeCode?) => {
  return <PngTableProps>{
    entity,
    columns: <PngTableColumnProps[]>[
      {
        dataField: entity.fields.code,
        hidden: true,
        fetch: true
      },
      {
        dataField: entity.fields.name,
        toolTip: '@row.code',
        overlays: <OverlayContext>{
          type: OverlayType.TABLE,
          content: (ctx) => {
            return <PngTableProps>{
              caption: '异动记录',
              entity: entity,
              paginatorPosition: 'bottom',
              alwaysShowPaginator: false,
              columns: <PngTableColumnProps[]>[
                {
                  dataField: entity.fields.changeDate
                },
                {
                  dataField: entity.fields.name
                },
                {
                  dataField: entity.fields.parent
                }
              ],
              $ext: {
                apiDataProps: {
                  query: [
                    esb.termQuery(ORG_ID_KEY, ctx['row'][ORG_ID_KEY])
                  ],
                  filter: esb.boolQuery().mustNot(esb.termQuery(entity.fields.isCurrent.key, true)),
                  sort: {[entity.fields.changeDate.key]: Order.DESC}
                },
                emptyMessage: '没有异动信息'
              }
            };
          }
        }
      },
      {
        dataField: entity.fields.parent,
        dataAttr: DataAttr.TAG,
        toolTip: '@row.parent.code'
      },
      {
        dataField: entity.fields.orgType,
        dataAttr: DataAttr.TAG
      },
      {
        dataField: entity.fields.inUse,
        dataAttr: DataAttr.TAG
      }
    ],
    $ext: {
      apiDataProps: {
        query: [
          DataTableUtils.getRoleBasedQuery(),
          esb.termQuery(ORG_TYPE_CODE_KEY, orgTypeCode)
        ],
        sort: entity.fields.code.key
      },
      rowExpandable: true,
      hasAddAction: true,
      hasEditAction: true,
      hasDeleteAction: true
    }
  };
};


