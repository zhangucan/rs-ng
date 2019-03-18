import {DataField, DataType} from '@er/types';
import {DISPLAY_ORDER_KEY} from '../../constants';

export const DISPLAY_ORDER_FIELD = <DataField>{
  key: DISPLAY_ORDER_KEY,
  label: '显示顺序',
  dataType: DataType.NUMBER,
  description: '设置信息的显示顺序，越小越靠前'
};
