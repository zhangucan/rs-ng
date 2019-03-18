import {Employee} from '@employee';
import {ApiUtils} from '@er/core';
import {ErFormlyFieldConfig} from '@er/formly';
import {PngFormlyTypes} from '@er/formly-primeng';
import {PngAutoCompleteProps, PngCalendarProps} from '@er/primeng';
import {ApiDataProps, DataItemProps, Order} from '@er/types';
import {CommonsUtils, DateUtils, DialogUtils} from '@er/utils';
import {Dept} from '@org/dept';
import {Group} from '@org/group';
import {Team} from '@org/team';
import * as esb from 'elastic-builder';
import {first} from 'rxjs/operators';

export const DEFAULT_ORG_EMP_KEY = '_orgEmp';

export const currentEmpAutoComplete = <ErFormlyFieldConfig>{
  key: 'emp',
  type: PngFormlyTypes.autoComplete,
  props: <PngAutoCompleteProps>{
    dataKey: Employee.fields.name.key,
    $ext: {
      apiDataProps: <ApiDataProps>{
        apiEntry: Employee.apiEntry,
        searchFields: Employee.fields.name.key,
        returnFields: [
          Employee.fields.name.key,
          Employee.fields.empId.key,
          Employee.fields.team.key,
          Employee.fields.group.key,
          Employee.fields.dept.key
        ],
        query: esb.termQuery(Employee.fields.isCurrent.key, true),
        sort: Employee.fields.empId.key,
        dataPath: 'items'
      },
      dataItemProps: <DataItemProps>{
        labelKey: Employee.fields.name.key,
        valueKey: ['id', Employee.fields.empId.key, Employee.fields.name.key],
        template: item => {
          const dept = item[Employee.fields.dept.key];
          const team = item[Employee.fields.team.key];
          const group = item[Employee.fields.group.key];
          return `<span>${item.name}</span>&nbsp;&nbsp;<span class="badge badge-pill badge-dept">${
            dept ? dept[Dept.fields.name.key] : ''
            }</span> <span class="badge badge-pill badge-team">${
            team ? team[Team.fields.name.key] : ''
            }</span><span class="badge badge-pill badge-group">${group ? group[Group.fields.name.key] : ''}
      </span>`;
        }
      }
    }
  },
  templateOptions: {
    label: '员工'
  }
};

export const fillInOrgInfo = (formlyForm, bizDate?) => {
  const empId = CommonsUtils.get(formlyForm.model, 'emp.empId');
  if (empId) {
    const model = formlyForm.model;
    delete model['dept'];
    delete model['team'];
    delete model['group'];
    delete model['header'];
    delete model[DEFAULT_ORG_EMP_KEY];
    bizDate = bizDate || model.bizDate;
    ApiUtils.getByQuery(Employee.apiEntry, {
      query: [
        esb.termQuery('empId', empId),
        esb.rangeQuery(Employee.fields.changeDate.key).lte(bizDate)
      ],
      sort: {[Employee.fields.changeDate.key]: Order.DESC},
      size: 1,
      fields: [
        Employee.fields.name.key,
        Employee.fields.empId.key,
        Employee.fields.team.key,
        Employee.fields.group.key,
        Employee.fields.dept.key,
        Employee.fields.changeDate.key
      ]
    }).subscribe(data => {
      if (data && data.items) {
        if (data.items.length === 1) {
          const orgEmp = data.items[0];
          DialogUtils.confirm('操作确认', confirmTemplate(orgEmp))
            .pipe(first())
            .subscribe(accept => {
              if (accept) {
                formlyForm.patchModel({
                  [DEFAULT_ORG_EMP_KEY]: orgEmp
                });
              } else {
                formlyForm.model = {...model};
              }
            });
        } else if (data.items && data.items.length === 0) {
          DialogUtils.error('数据异常', '没有查询到该时间点的员工在岗信息');
        }
      }
    });
  }
};

export const orgEmpFields = (dateKey, dateLabel, empLabel = '员工') => {
  return [
    {
      type: PngFormlyTypes.dyna,
      props: {
        content: field => {
          return field && field.model && orgEmpSelectedTemplate(field.model, empLabel);
        }
      },
      templateOptions: {
        hideLabel: true
      },
      hideExpression: (field) => {
        return !field.hasOwnProperty('emp') && !field.hasOwnProperty('dept');
      }
    },
    <ErFormlyFieldConfig>{
      key: dateKey,
      type: PngFormlyTypes.calendar,
      props: <PngCalendarProps>{
        render: value => DateUtils.getFormattedDate(value, 'YYYY-MM-DD'),
        onSelect: event => fillInOrgInfo(event.field.formProps.formlyForm)
      },
      templateOptions: {
        label: dateLabel
      }
    },
    CommonsUtils.merge({}, currentEmpAutoComplete, <ErFormlyFieldConfig>{
      props: <PngAutoCompleteProps>{
        render: (value, model) => orgEmpSelectedTemplate(model, empLabel),
        onSelect: event => fillInOrgInfo(event.field.formProps.formlyForm)
      },
      templateOptions: {
        label: empLabel
      }
    })
  ];
};

export const confirmTemplate = orgEmp => {
  return `
   <span>请确认当前选中的信息：</span>
   <div class="my-2 border-bottom">
      <span>员工姓名：</span>
      <span><b>${orgEmp.name || ''}</b></span>
   </div>
   <div class="my-2 border-bottom">
       <span>部门：</span>
       <span><b>${(orgEmp.dept && orgEmp.dept.name) || ''}</b></span>
   </div>
   <div class="my-2 border-bottom">
       <span>项目组：</span>
       <span><b>${(orgEmp.team && orgEmp.team.name) || ''}</b></span>
   </div>
   <div class="my-2 border-bottom">
      <span>小组：</span>
      <span><b>${(orgEmp.group && orgEmp.group.name) || ''}</b></span>
   </div> 
   <div class="my-2">
      <span>异动时间：</span>
      <span><b>${orgEmp.changeDate || ''}</b></span>
   </div>
   `;
};

export const orgEmpDropDownTemplate = item => {
  const dept = item[Employee.fields.dept.key];
  const team = item[Employee.fields.team.key];
  const group = item[Employee.fields.group.key];
  return `<span>${item.name}</span>&nbsp;&nbsp;<span class="badge badge-pill badge-primary">${
    dept ? dept[Dept.fields.name.key] : ' '
    }</span> <span class="badge badge-pill badge-info">${
    team ? team[Team.fields.name.key] : ' '
    }</span> <span class="badge badge-pill badge-dark">
      ${group ? group[Group.fields.name.key] : ' '}
      </span>
      <span class="red font-weight-bold"><i class="fa fa-clock-o"></i>异动时间：${item.changeDate}</span>`;
};

export const orgEmpSelectedTemplate = (model, empLabel = '员工') => {
  model = model && (model[DEFAULT_ORG_EMP_KEY] || model);
  let content = '';
  if (!model) {
    content = '【未选择】';
  } else {
    if (model.name || model.emp) {
      content += `<span class="font-weight-bold font-size-5"> ${model.name ? model.name : model.emp.name} </span>`;
    }
    if (model && model.dept) {
      content += ` - <span class="badge badge-pill badge-primary font-size-6"> ${model.dept.name}</span>`;
    }
    if (model && model.team) {
      content += ` - <span class="badge badge-pill badge-info font-size-6"> ${model.team.name}</span>`;
    }
    if (model && model.group) {
      content += ` - <span class="badge badge-pill badge-dark font-size-6"> ${model.group.name}</span>`;
    }
  }
  if (model && model.changeDate) {
    content += ` - <span class="red font-weight-bold"><i class="fa fa-clock-o"></i> 岗位开始时间：${
      model.changeDate
      } </span>`;
  }
  const message = `
        <div class="alert alert-info">
          <div class="my-3"><i class="fa fa-info-circle text-success fa-2x"></i> ${empLabel}：</div> 
          <div>
             ${content}
          </div>
       </div> 
       `;
  return message;
};

export const getOrgEmpSubmitModel = ctx => {
  if (!ctx.model['dept']) {
    const orgEmp = ctx.model[DEFAULT_ORG_EMP_KEY];
    if (!orgEmp) {
      DialogUtils.error('错误提示', '请选择确定员工执行本业务时的信息');
      return false;
    }
    delete ctx.model[DEFAULT_ORG_EMP_KEY];
    ctx.model['dept'] = orgEmp.dept;
    ctx.model['team'] = orgEmp.team;
    ctx.model['group'] = orgEmp.group;
    ctx.model['header'] = orgEmp.header;
    return ctx.model;
  }
};
