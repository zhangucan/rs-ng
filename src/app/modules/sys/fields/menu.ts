import {DataField, DataType} from '@er/types';
import {CODE_FIELD, DISPLAY_ORDER_FIELD, parentProps} from '@shares';

const menuApiEntry = 'sys-menu';

export const Menu = {
  key: 'menu',
  label: '菜单',
  apiEntry: menuApiEntry,
  fields: {
    code: CODE_FIELD,
    label: <DataField>{
      key: 'label',
      label: '菜单名',
      required: true
    },
    parent: <DataField>{
      ...parentProps(menuApiEntry),
      label: '上级菜单'
    },
    displayOrder: DISPLAY_ORDER_FIELD,
    title: <DataField>{
      key: 'title',
      label: '文本'
    },
    icon: <DataField>{
      key: 'icon',
      label: '图标'
    },
    routeLink: <DataField>{
      key: 'routeLink',
      label: '内部地址'
    },
    url: <DataField>{
      key: 'url',
      label: '外部地址'
    },
    disable: <DataField>{
      key: 'disable',
      label: '可用',
      dataType: DataType.BOOLEAN
    },
    visible: {
      key: 'visible',
      label: '显示',
      dataType: DataType.BOOLEAN
    },
    isSeparator: <DataField>{
      key: 'isSeparator',
      label: '分割符',
      dataType: DataType.BOOLEAN
    },
    styleClass: <DataField>{
      key: 'styleClass',
      label: '样式类'
    },
    style: <DataField>{
      key: 'style',
      label: '样式'
    },
    target: <DataField>{
      key: 'target',
      label: '打开目标'
    }
  }
};
