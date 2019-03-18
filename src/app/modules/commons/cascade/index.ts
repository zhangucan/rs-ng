import {Employee} from '@employee';
import {PngFormlyTypes} from '@er/formly-primeng';
import {ApiUtils} from '@er/core';
import * as esb from 'elastic-builder';
import {PngSelectProps} from '@er/primeng';
import {Group} from '@org/group';

const setFieldState = (data, field, targetFieldKey) => {
  if (data && data.items.length === 0) {
    field.context.control(targetFieldKey).disable();
    field.context.fieldProps(targetFieldKey).templateOptions.description = '没有可选项';
  } else {
    field.context.control(targetFieldKey).enable();
    field.context.fieldProps(targetFieldKey).templateOptions.description = '';
  }
  field.context.data$(targetFieldKey).next(data.items);
};

export const OrgCascade = [
  {
    dataField: Employee.fields.dept
  },
  {
    dataField: Employee.fields.team,
    props: <PngSelectProps>{
      onSelect: event => {
        if (event.field.context.formControl.value) {
          ApiUtils.getByQuery(Group.apiEntry, {
            query: esb.prefixQuery('parent.code', event.field.context.formControl.value.code),
            size: 1000
          }).subscribe(data => {
            // setFieldState(data, event.field, Employee.fields.group.key);
            event.field.context.form.get(Employee.fields.group.key).setValue(null);
            event.field.context.data$(Employee.fields.group.key).next(data.items);
          });
        }
      }
    }
  },
  {
    dataField: Employee.fields.group,
    type: PngFormlyTypes.select
  }
];
