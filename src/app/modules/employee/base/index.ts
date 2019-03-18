import {Employee} from '@employee';
import {ApiUtils} from '@er/core';
import {map} from 'rxjs/operators';

export function employeeChangeBeforeSubmit(model) {
  return ApiUtils.patchById(Employee.apiEntry, model['id'], {
    isCurrent: false
  }).pipe(
    map(_ => {
      model[Employee.fields.isCurrent.key] = true;
      delete model['id'];
    })
  );
}
