import {DataAttr} from '@er/types';

export const moveActionButton = {
  dataAttr: DataAttr.BUTTONS,
  isActionColumn: true,
  label: '操作',
  cellContent: {
    title: '异动',
    icon: 'fa fa-forward',
    styleClass: 'ui-button-rounded ui-button-primary',
    onClick: event => {
      event.pngTable.navigate(['edit', event.row['id']], {action: 'move'});
    }
  }
};
