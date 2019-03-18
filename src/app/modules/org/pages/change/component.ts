import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from '@er/core';
import {ErFormlyFieldConfig} from '@er/formly';
import {PngAutoCompleteProps, PngTreeComponent} from '@er/primeng';
import {ApiDataProps, DataItemProps, FormProps, UiLandscape} from '@er/types';
import {CommonsUtils} from '@er/utils';
import {Org} from '@org/org';
import {DISPLAY_ORDER_KEY, ORG_AUTO_COMPLETE} from '@shares';
import * as esb from 'elastic-builder';
import {TreeDragDropService, TreeNode} from 'primeng/primeng';

@Component({
  templateUrl: 'tpl.html',
  styleUrls: ['styles.scss'],
  providers: [TreeDragDropService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrgChangeComponent extends BaseComponent implements OnInit {

  dragNodes: {}[];

  dragNode: {};

  autoCompleteProps = <PngAutoCompleteProps>{
    onSelect: this.onSelect.bind(this),
    $ext: {
      apiDataProps: <ApiDataProps>{
        apiEntry: Org.apiEntry,
        query: esb.existsQuery(Org.fields.parent.key),
        searchFields: Org.fields.name.key,
        returnFields: [Org.fields.code.key, Org.fields.name.key, Org.fields.parent.key, Org.fields.orgType.key],
        sort: [DISPLAY_ORDER_KEY, Org.fields.code.key],
        dataPath: 'items'
      },
      dataItemProps: <DataItemProps>{
        labelKey: Org.fields.name.key,
        template: item => {
          return `
            <i class="fa fa-institution mr-1"></i>
            <span class="mr-2 font-weight-bold">${item['name']}</span>
            <span class="badge badge-info">${item.parent && item.parent.name}</span>
          `;
        }
      }
    }
  };

  treeProps = {
    ...ORG_AUTO_COMPLETE,
    draggableNodes: false,
    droppableNodes: true,
    onNodeDrop: this.onDropped.bind(this)
  };

  formProps: FormProps = {
    entity: Org,
    landscape: UiLandscape.horizontal,
    fields: <ErFormlyFieldConfig[]>[
      {
        dataField: Org.fields.name
      },
      {
        dataField: Org.fields.orgType
      },
      {
        dataField: Org.fields.changeDate
      },
      {
        dataField: Org.fields.changeType
      }
    ],
    beforeSubmit: this.beforeSubmit.bind(this)
  };

  @ViewChild('destTree') pngTree: PngTreeComponent;

  onSelect(event) {
    delete event.$from;
    this.dragNodes = [];
    this.dragNodes.push({
      label: event['name'],
      data: event
    });
    this.formProps.modelId = event['id'];
  }

  delete(node) {
    this.pngTree.tree.value = this.deleteNode(this.pngTree.tree.value, node.data.id);
    this.dragNodes = [];
    this.dragNodes.push({
      label: node.data['name'],
      data: node.data
    });
  }

  deleteNode(treeNodes: TreeNode[], id, idKey = 'id'): TreeNode[] {
    if (treeNodes) {
      for (let i = 0; i < treeNodes.length; i++) {
        if (id === (treeNodes[i][idKey] || treeNodes[i]['data'][idKey])) {
          return CommonsUtils.removeByIndex(treeNodes, i);
        }
        if (treeNodes[i].hasOwnProperty('children')) {
          const children = treeNodes[i]['children'];
          treeNodes[i]['children'] = this.deleteNode(children, id, idKey);
        }
      }
    }
    return treeNodes;
  }

  onDropped(event) {
    event.dropNode.expanded = true;
    event.dragNode.dropped = true;
    (<TreeNode>event.dragNode).icon = 'fa fa-arrow-right red';
  }

  beforeSubmit(ctx) {

  };
}
