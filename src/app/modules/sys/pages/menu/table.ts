import {PngTableColumnProps, PngTableProps} from '@er/primeng';
import {DataAttr} from '@er/types';
import {Menu} from '../../fields/menu';

export const table = <PngTableProps>{
  entity: Menu,
  columns: <PngTableColumnProps[]>[
    {
      dataField: Menu.fields.icon,
      dataAttr: DataAttr.ICON,
      sortable: false,
      aggable: false,
      filterable: false,
      width: '50px'
    },
    {
      dataField: Menu.fields.label
    },
    {
      dataField: Menu.fields.routeLink,
      dataAttr: DataAttr.TAG
    },
    {
      dataField: Menu.fields.parent,
      dataAttr: DataAttr.TAG
    },
    {
      dataField: Menu.fields.visible,
      hidden: true
    },
    {
      dataField: Menu.fields.disable,
      hidden: true
    },
    {
      dataField: Menu.fields.isSeparator,
      hidden: true
    },
    {
      dataField: Menu.fields.style,
      hidden: true
    },
    {
      dataField: Menu.fields.styleClass,
      hidden: true
    },
    {
      dataField: Menu.fields.url,
      hidden: true
    },
    {
      dataField: Menu.fields.target,
      hidden: true
    }
  ],
  $ext: {
    apiDataProps: {
      sort: [`${Menu.fields.parent.key}.code`, Menu.fields.code.key]
    },
    hasAddAction: true,
    hasDeleteAction: true,
    hasEditAction: true
  }
};
