import {Employee} from '@employee';
import {PngAutoCompleteProps} from '@er/primeng';

const apiDataProps = {
  apiEntry: Employee.apiEntry,
  searchFields: 'name',
  dataPath: 'items',
  sort: 'displayOrder',
  returnFields: ['name', 'dept', 'team']
};

export const employeeNameSelector = <PngAutoCompleteProps>{
  dropdown: true,
  minLength: 1,
  field: 'name',
  $ext: {
    apiDataProps,
    dataItemProps: {
      valueKey: ['name'],
      template: item => {
        return `
                  <span><i class="fa fa-user"></i> ${item['name']}</span>&nbsp;
                  <span class="badge badge-pill badge-primary">${item['dept'] && item['dept']['name'] || ''}</span>
                `;
      }
    }
  }
};

export const employeeSelector = <PngAutoCompleteProps>{
  dropdown: true,
  minLength: 1,
  $ext: {
    apiDataProps,
    dataItemProps: {
      labelKey: 'name',
      valueKey: ['name', 'id'],
      template: item => {
        return `
                  <span><i class="fa fa-user"></i> ${item['name']}</span>&nbsp;
                  <span class="badge badge-pill badge-primary">${item['team'] && item['team']['name'] || ''}</span>
                `;
      }
    }
  }
};
