import {DataField, DataType} from '@er/types';
import {IS_CURRENT_KEY} from '../../constants';


export const IS_CURRENT_FIELD = <DataField>{
  key: IS_CURRENT_KEY,
  label: '是否当前',
  dataType: DataType.BOOLEAN,
  defaultValue: true
};
