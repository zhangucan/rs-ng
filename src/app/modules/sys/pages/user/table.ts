import {Employee} from '@employee';
import {ApiUtils} from '@er/core';
import {PngTableColumnProps, PngTableProps} from '@er/primeng';
import {ApiPayload, DataAttr, Order, OverlayContext, OverlayType} from '@er/types';
import {User} from '@sys/user';
import * as esb from 'elastic-builder';

export const table = <PngTableProps>{
  entity: User,
  columns: <PngTableColumnProps[]>[
    {
      dataField: User.fields.empId,
      hidden: true
    },
    {
      dataField: User.fields.userName,
      onClick: ctx => {
        if (ctx.row[ctx.column.key]) {
          ApiUtils.getByQuery(Employee.apiEntry, <ApiPayload>{
            query: [
              esb.termQuery(Employee.fields.empId.key, ctx.row[Employee.fields.empId.key]),
              esb.termQuery(Employee.fields.isCurrent.key, true)
            ],
            fields: ['name', 'dept']
          }).subscribe(data => {
            ctx.pngTable.showOverlay(<OverlayContext>{
              type: OverlayType.COMPONENT,
              $event: ctx.$event,
              content: () => {
                const item = (data.items && data.items[0]) || {};
                return `
                     <div class="d-flex flex-column align-items-start alert alert-info">
                   <div class="m-2">
                       <span >员工姓名:</span>
                       <span><strong>${item['name']}</strong></span>
                    </div>
                    <div class="m-2">
                       <span >所属部门:</span>
                       <span><strong>${item['dept'].name}</strong></span>        
                    </div>                       
                  </div>
                  `;
              }
            });
          });
        }
      }
    },
    {
      dataField: User.fields.roles,
      dataAttr: DataAttr.TAG
    },
    {
      dataField: User.fields.loginDate,
      dataAttr: DataAttr.UP_TO_NOW
    },
    {
      dataAttr: DataAttr.BUTTONS,
      isActionColumn: true,
      label: '操作',
      cellContent: [
        // {
        //   title: '强制下线',
        //   icon: 'fa fa-forward',
        //   styleClass: 'ui-button-rounded ui-button-primary',
        //   onClick: event => {
        //   },
        // },
        // {
        //   title: '禁止登录',
        //   icon: 'fa fa-forward',
        //   styleClass: 'ui-button-rounded ui-button-primary',
        //   onClick: event => {
        //   },
        // },
        // {
        //   title: '设置角色',
        //   icon: 'fa fa-forward',
        //   styleClass: 'ui-button-rounded ui-button-primary',
        //   onClick: event => {
        //   },
        // },
        // {
        //   title: '设置权限',
        //   icon: 'fa fa-forward',
        //   styleClass: 'ui-button-rounded ui-button-primary',
        //   onClick: event => {
        //   },
        // },
      ]
    }
  ],
  $ext: {
    apiDataProps: {
      sort: {[User.fields.loginDate.key]: Order.DESC}
    },
    hasAddAction: true,
    hasEditAction: true,
    hasDeleteAction: true,
    rowExpandable: true
  }
};
