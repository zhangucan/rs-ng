import {PageModel} from '@er/types';
import {form} from './form';
import {table} from './table';

export const recall = <PageModel>{
  table: table,
  form: form
};
