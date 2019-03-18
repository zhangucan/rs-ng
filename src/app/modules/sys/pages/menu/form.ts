import {ErFormlyFieldConfig, FormlyUtils} from '@er/formly';
import {PngFormlyWrappers} from '@er/formly-primeng';
import {FormProps, UiLandscape} from '@er/types';
import {TreeUtils} from '@er/utils';
import {distinctSuggest} from '@shares';
import * as esb from 'elastic-builder';
import {distinctUntilChanged, map, takeUntil} from 'rxjs/operators';
import {Menu} from '../../fields/menu';


export const form = <FormProps>{
  entity: Menu,
  landscape: UiLandscape.horizontal,
  fields: <ErFormlyFieldConfig[]>[
    {
      dataField: Menu.fields.parent
    },
    {
      fieldGroupClassName: 'row',
      wrappers: PngFormlyWrappers.pngPanelWrapper,
      fieldGroup: <ErFormlyFieldConfig[]>[
        {
          dataField: Menu.fields.code,
          className: 'col-4',
          ...distinctSuggest(Menu.apiEntry, Menu.fields.code.key),
          attrs: {
            placeholder: '请输入唯一的代码值'
          },
          templateOptions: {
            description: '内容必须唯一，可以不填，不填时系统自动生成'
          }
        },
        {
          dataField: Menu.fields.label,
          className: 'col-4'
        },
        {
          dataField: Menu.fields.icon,
          className: 'col-4'
        }
      ],
      templateOptions: {
        landscape: UiLandscape.vertical,
        panel: {
          header: '关键属性信息'
        }
      }
    },
    {
      fieldGroupClassName: 'row',
      wrappers: PngFormlyWrappers.pngPanelWrapper,
      fieldGroup: [
        {
          dataField: Menu.fields.routeLink,
          className: 'col-4'
        },
        {
          dataField: Menu.fields.url,
          className: 'col-4'
        },
        {
          dataField: Menu.fields.target,
          className: 'col-4'
        }
      ],
      templateOptions: {
        landscape: UiLandscape.vertical,
        panel: {
          header: '链接属性信息'
        }
      }
    },
    {
      fieldGroupClassName: 'row',
      wrappers: PngFormlyWrappers.pngPanelWrapper,
      fieldGroup: [
        {
          dataField: Menu.fields.styleClass,
          className: 'col-6'
        },
        {
          dataField: Menu.fields.style,
          className: 'col-6'
        }
      ],
      templateOptions: {
        landscape: UiLandscape.vertical,
        panel: {
          header: '样式属性信息'
        }
      }
    },
    {
      dataField: Menu.fields.displayOrder
    },
    {
      dataField: Menu.fields.isSeparator
    },
    {
      dataField: Menu.fields.visible
    },
    {
      dataField: Menu.fields.disable
    }
  ],
  resetKeys: [Menu.fields.label.key, Menu.fields.code.key],
  hooks: {
    onInit: formlyForm => {
      formlyForm.getFormControl(Menu.fields.parent.key).valueChanges
        .pipe(
          takeUntil(formlyForm.destroyed$),
          map(value => value),
          distinctUntilChanged()
        )
        .subscribe((value) => {
          const codeComponent = formlyForm.getFormComponent(Menu.fields.code.key);
          const parentComponent = formlyForm.getFormComponent(Menu.fields.parent.key);
          if (value) {
            codeComponent.apiDataProps.query = esb.termQuery('parent', value);
            parentComponent.apiDataProps.query = esb.termQuery('parent', value);
          } else {
            codeComponent.apiDataProps.query = esb.matchNoneQuery();
            parentComponent.apiDataProps.query = esb.matchNoneQuery();
          }
        });
      let parent = formlyForm.model && formlyForm.model.parent;
      if (!parent) {
        const node = TreeUtils.getSelectedNode(formlyForm && formlyForm['tableId']);
        if (node) {
          parent = {parent: node['code']};
          formlyForm.patchModel({parent});
        }
      }
    }
  },
  beforeSubmit: (ctx) => FormlyUtils.resolveDistinctFieldValue(ctx, Menu)
};
