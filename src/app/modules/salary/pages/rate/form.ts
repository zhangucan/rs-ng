import {ErFormlyFieldConfig} from '@er/formly';
import {PngFormlyTypes} from '@er/formly-primeng';
import {PngCalendarProps, PngSliderProps} from '@er/primeng';
import {FormProps, UiLandscape} from '@er/types';
import {DateUtils} from '@er/utils';
import {Rate} from '../../fields/rate';

export const form = <FormProps>{
  entity: Rate,
  landscape: UiLandscape.horizontal,
  hasBackBtn: true,
  fields: <ErFormlyFieldConfig[]>[
    {
      dataField: Rate.fields.team
    },
    {
      dataField: Rate.fields.staffRate,
      type: PngFormlyTypes.slider,
      props: <PngSliderProps>{
        max: 100,
        min: 0,
        step: 1
      }
    },
    {
      dataField: Rate.fields.groupleaderRate,
      type: PngFormlyTypes.slider,
      props: <PngSliderProps>{
        max: 100,
        min: 0,
        step: 1
      }
    },
    {
      dataField: Rate.fields.managerRate,
      type: PngFormlyTypes.slider,
      props: <PngSliderProps>{
        max: 100,
        min: 0,
        step: 1
      }
    },
    {
      dataField: Rate.fields.month,
      type: PngFormlyTypes.calendar,
      props: <PngCalendarProps>{
        dateFormat: 'yy-mm'
      }
    }
  ],
  beforeSubmit: ctx => {
    ctx.model.month = DateUtils.getMoment(ctx.model.month)
      .startOf('month')
      .format('YYYY-MM-DD');
    ctx.model.managerRate = ctx.model.managerRate / 100;
    ctx.model.groupleaderRate = ctx.model.groupleaderRate / 100;
    ctx.model.staffRate = ctx.model.staffRate / 100;
  }
};
