import {ErFormlyFieldConfig} from '@er/formly';
import {PngFormlyTypes, PngFormlyWrappers} from '@er/formly-primeng';
import {FormProps, UiLandscape} from '@er/types';
import {EnrollDetail} from '../../fields/enroll-detail';

export const form = <FormProps>{
  entity: EnrollDetail,
  landscape: UiLandscape.horizontal,
  fields: <ErFormlyFieldConfig[]>[
    {
      dataField: EnrollDetail.fields.bizDate
    },
    {
      dataField: EnrollDetail.fields.employer
    },
    {
      fieldGroupClassName: 'row',
      wrappers: PngFormlyWrappers.pngPanelWrapper,
      fieldGroup: [
        {
          dataField: EnrollDetail.fields.self,
          className: 'col-4'
        },
        {
          dataField: EnrollDetail.fields.agent,
          className: 'col-4'
        },
        {
          dataField: EnrollDetail.fields.inner,
          className: 'col-4'
        }
      ],
      templateOptions: {
        panel: {
          header: '我方入职情况'
        }
      }
    },
    {
      type: PngFormlyTypes.dyna,
      props: {
        content: field => {
          return `<div class="pull-right alert alert-info"><i class="fa fa-sum"></i> 今日入职合计：${field.model['self'] + field.model['agent'] + field.model['inner']}</div>`;
        }
      }
    },
    // {
    //   dataField: EnrollDetail.fields.competitor,
    //   type: BsFormlyTypes.array,
    //   fieldGroupClassName: 'row',
    //   fieldGroup: [
    //     {
    //       dataField: EnrollDetail.fields.competitor.name,
    //       className: 'col-6'
    //     },
    //     {
    //       dataField: EnrollDetail.fields.competitor.amount,
    //       className: 'col-6'
    //     }
    //   ]
    // },
    {
      dataField: EnrollDetail.fields.brand,
      wrappers: PngFormlyWrappers.pngPanelWrapper,
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          dataField: EnrollDetail.fields.brand.competitor,
          className: 'col-4'
        },
        {
          dataField: EnrollDetail.fields.brand.customer,
          className: 'col-4'
        },
        {
          dataField: EnrollDetail.fields.brand.staff,
          className: 'col-4'
        }
      ],
      templateOptions: {
        panel: {
          header: EnrollDetail.fields.brand.label,
          barStyleClass: 'bg-blue white'
        }
      }
    },
    {
      dataField: EnrollDetail.fields.portion,
      wrappers: PngFormlyWrappers.pngPanelWrapper,
      fieldGroup: [
        {
          dataField: EnrollDetail.fields.portion.suggestion
        }
      ],
      templateOptions: {
        panel: {
          header: EnrollDetail.fields.portion.label,
          barStyleClass: 'bg-yellow white'
        }
      }
    },
    {
      dataField: EnrollDetail.fields.staff,
      wrappers: PngFormlyWrappers.pngPanelWrapper,
      fieldGroup: [
        {
          dataField: EnrollDetail.fields.staff.absence
        },
        {
          dataField: EnrollDetail.fields.staff.contribution
        },
        {
          dataField: EnrollDetail.fields.staff.leave
        }
      ],
      templateOptions: {
        panel: {
          header: EnrollDetail.fields.staff.label,
          barStyleClass: 'bg-green white'
        }
      }
    }
  ]
};
