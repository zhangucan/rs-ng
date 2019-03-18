import {ApiDataProps, DataField, DataType} from '@er/types';
import {DISPLAY_ORDER_KEY, EMPLOYEE_ID_KEY} from '../../constants';

export const EMPLOYEE_API_ENTRY = 'sys-employee';

export const EMPLOYEE_FIELD = <DataField>{
  key: 'employee',
  label: '员工',
  required: true,
  sortKey: EMPLOYEE_ID_KEY,
  dataType: DataType.JSON,
  apiDataProps: <ApiDataProps>{
    apiEntry: EMPLOYEE_API_ENTRY,
    searchFields: 'name',
    returnFields: [EMPLOYEE_ID_KEY, 'name', 'org'],
    sort: [DISPLAY_ORDER_KEY, EMPLOYEE_ID_KEY]
  },
  dataItemProps: {
    labelKey: 'name',
    valueKey: ['id', 'name'],
    template: item => `<span><b>${item.name}</b></span> <span class="badge badge-success"> ${item.org.name}</span> `
  },
  defaultKey: 'name'
};
