import {DataAttr} from '@er/types';

export const moveBtn = {
  dataAttr: DataAttr.BUTTONS,
  isActionColumn: true,
  label: '操作',
  cellContent: {
    title: '异动',
    icon: 'fa fa-forward',
    styleClass: 'ui-button-rounded ui-button-primary',
    onClick: event => {
      event.pngTable.navigate(['edit', event.row['id']], {action: 'move'});
    },
    show: {
      method: () => {
        return true;
      }
    }
  }
};

export * from './form';
export * from './table';
export * from './data-code';
export * from './tree';
