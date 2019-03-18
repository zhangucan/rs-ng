import {ErFormlyFieldConfig} from '@er/formly';
import {PngFormlyTypes} from '@er/formly-primeng';
import {PngCalendarProps} from '@er/primeng';
import {FormProps, UiLandscape} from '@er/types';
// import {ManagerSelect} from '';
import {Profit} from '../../fields/profit';

export const form = <FormProps>{
  entity: Profit,
  landscape: UiLandscape.horizontal,
  fields: <ErFormlyFieldConfig[]>[
    {
      dataField: Profit.fields.team,
      // props: {...ManagerSelect}
    },
    {
      dataField: Profit.fields.manager,
      type: PngFormlyTypes.select
    },
    {
      dataField: Profit.fields.month,
      type: PngFormlyTypes.calendar,
      props: <PngCalendarProps> {
        dateFormat: 'yy-mm'
      }
    },
    {
      dataField: Profit.fields.commonCost
    },
    {
      dataField: Profit.fields.incoming
    },
    {
      dataField: Profit.fields.teamCost
    }
  ]
};
