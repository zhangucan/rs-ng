import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Employee} from '@employee';
import {BaseComponent} from '@er/core';
import {PngAutoCompleteProps} from '@er/primeng';
import {ApiDataProps, DataItemProps} from '@er/types';
import {DataTreeUtils} from '@shares';
import {TreeDragDropService} from 'primeng/primeng';

@Component({
  templateUrl: './index.html',
  styleUrls: ['styles.scss'],
  providers: [TreeDragDropService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployerChangeComponent extends BaseComponent implements OnInit {
  dragNodes: {}[];

  autoCompleteProps = <PngAutoCompleteProps>{
    onSelect: this.onSelect.bind(this),
    dataKey: 'id',
    $ext: {
      apiDataProps: <ApiDataProps>{
        apiEntry: Employee.apiEntry,
        searchFields: Employee.fields.name.key,
        returnFields: [],
        dataPath: 'items'
      },
      dataItemProps: <DataItemProps>{
        labelKey: Employee.fields.name.key,
        template: item => {
          return `
                         <span class="text-muted mr-2">${
            item.dept['name']
            }</span>
                         <span>${item.name}(${item.empId})</span>
                        `;
        }
      }
    }
  };

  treeProps = {
    ...DataTreeUtils.userOrgTree(
      null,
      {
        draggableNodes: 'true',
        droppableNodes: 'true',
        onNodeDrop: this.onDropped.bind(this)
      }
    )
  };

  onSelect(event) {
    if (this.dragNodes) {
      const added = this.dragNodes.filter(
        node => event['id'] === node['data'].id
      );
      if (added.length > 0) {
        return;
      }
    }
    delete event.$from;
    if (!this.dragNodes) {
      this.dragNodes = [];
    }
    this.dragNodes.push({
      label: event['name'],
      data: event
    });
  }

  onDropped(event) {
    this.dragNodes = this.dragNodes.filter(
      node => node['id'] !== event.dragNode.data.id
    );
    if (this.dragNodes.length === 0) {
      this.dragNodes = undefined;
    }
    // todo:
    // ApiUtils.save(event.dragNode.data)
    console.log(event.dragNode.data);
    console.log(event.dropNode.data);
    event.dropNode.expanded = true;
  }
}
