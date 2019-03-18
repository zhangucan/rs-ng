import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BaseComponent} from '@er/core';
import {PNG_TREE_NODE_KEYS} from '@er/primeng';
import {TreeUtils} from '@er/utils';
import {DataTree, DataTreeUtils, ORG_TYPE_CODE} from '@shares';
import {TreeNode} from 'primeng/api';
import {Subject} from 'rxjs';

@Component({
  template: `
    <p-tabView>
      <p-tabPanel header="分层查看" style="min-width: 800px; overflow: auto">
        <png-tree erPropsBind [props]="tree"></png-tree>
      </p-tabPanel>
      <p-tabPanel header="整体查看">
        <div class="org-chart">
          <p-organizationChart
            selectionMode="single"
            [erApiData]="apiDataProps"
            [value]="data$|async"
            (onDataReady)="onTreeDataReady($event)"
            styleClass="corp">
            <ng-template let-node pTemplate="root">
              <div class="corp node-header ui-corner-top" [innerHTML]="node.label"></div>
              <div class="node-content">
                <img src="assets/images/tang.jpg" width="50">
              </div>
            </ng-template>
            <ng-template let-node pTemplate="corp">
              <div class="dept node-header ui-corner-top" [innerHTML]="node.label"></div>
            </ng-template>
            <ng-template let-node pTemplate="dept">
              <div class="dept node-header ui-corner-top" [innerHTML]="node.label"></div>
            </ng-template>
            <ng-template let-node pTemplate="team">
              <div class="team node-header ui-corner-top" [innerHTML]="node.label"></div>
            </ng-template>
            <ng-template let-node pTemplate="group">
              <div class="group node-header ui-corner-top" [innerHTML]="node.label"></div>
            </ng-template>
            <ng-template let-node pTemplate="more">
              <div class="group node-header ui-corner-top" [innerHTML]="node.label"></div>
            </ng-template>
          </p-organizationChart>
        </div>
      </p-tabPanel>
    </p-tabView>

    <i class="fa fa-institution"></i>

  `,
  styleUrls: ['styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class OrgOutlineComponent extends BaseComponent {

  tree = DataTreeUtils.buildTreeProps(<DataTree>{
    treeProps: {
      layout: 'horizontal',
      style: {'min-width.px': 2000, height: '100%', overflow: 'auto'},
      $ext: {
        hasSearchBox: false,
        dataItemProps: {
          labelKey: (item) => `<span class="badge-corner">${item['data'].name} <span class="badge badge-pill badge-success">${item.children ? item.children.length : 0}</span></span>`
        }
      }
    }
  });

  apiDataProps = this.tree.$ext.apiDataProps;

  data$ = new Subject();

  onTreeDataReady(event) {
    const treeNodes = TreeUtils.transNodes(event.items, {
      src: {
        ...this.tree.$ext.dataItemProps,
        labelKey: 'name'
      },
      node: PNG_TREE_NODE_KEYS
    }, null, false);
    const root = treeNodes[0];
    this.hideMore(root, 20);
    TreeUtils.expandNode(root, true, this.tree.$ext);
    this.data$.next(treeNodes);
  }

  hideMore(node: TreeNode, max) {

    if (node.data && node.data.orgType) {
      const orgTypeCode = node.data.orgType.code;
      if (orgTypeCode === ORG_TYPE_CODE.CORP) {
        if (!node.data.parent) {
          node.type = 'root';
        } else {
          node.type = 'corp';
        }
      } else if (orgTypeCode === ORG_TYPE_CODE.DEPT) {
        node.type = 'dept';
      } else if (orgTypeCode === ORG_TYPE_CODE.TEAM) {
        node.type = 'team';
      } else if (orgTypeCode === ORG_TYPE_CODE.GROUP) {
        node.type = 'group';
      }
    }
    if (node.children) {
      if (node.children.length > max) {
        const n = node.children.length;
        node.children = node.children.slice(0, 20);
        node.children.push(<TreeNode> {
          label: `更多...(${n - 20})`,
          type: 'more'
        });
      }
      node.children.forEach(child => this.hideMore(child, 20));
    }
    return node;
  }
}
