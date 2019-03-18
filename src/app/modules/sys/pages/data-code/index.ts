import {PngTreeProps} from '@er/primeng';
import {DataItemProps, PageModel} from '@er/types';
import {DISPLAY_ORDER_KEY, MAX_SIZE, onNodeSelect} from '@shares';
import {DataCode} from '@sys/data-code';
import {DataCodeCat} from '../../fields/data-code-cat';
import {form} from './form';
import {table} from './table';

export const dataCode = <PageModel>{
  form,
  table,
  tree: <PngTreeProps>{
    selectionMode: 'single',
    onNodeSelect: (event) => onNodeSelect(event, 'catCode.code'),
    $ext: {
      root: {label: '全部代码类别', data: {code: '0'}},
      caption: '代码类别树',
      apiDataProps: {
        apiEntry: DataCodeCat.apiEntry,
        size: MAX_SIZE,
        sort: [DISPLAY_ORDER_KEY, 'code']
      },
      dataItemProps: <DataItemProps>{
        idKey: DataCode.fields.code.key,
        labelKey: DataCode.fields.name.key,
        levelIdLength: 3
      },
      collapsedIcon: 'fa fa-cog',
      expandedIcon: 'fa fa-folder'
    }
  }
};
