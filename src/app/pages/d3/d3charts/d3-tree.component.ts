import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { D3TreeService } from './d3-tree.service';
import { AngularD3TreeLibService } from 'angular-d3-tree';

@Component({
  selector: 'ngx-d3-tree',
  templateUrl: './d3-tree.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class D3TreeComponent {

  data: any[];
  source: LocalDataSource = new LocalDataSource();

  constructor(private d3TreeService: D3TreeService, private treeService: AngularD3TreeLibService) {
    // load static data
    this.data = [
      {
        'name': 'Top Level',
        'parent': 'null',
        'children': [
          {
            'name': 'Level 2: A',
            'parent': 'Top Level',
            'children': [
              {
                'name': 'Son of A',
                'parent': 'Level 2: A',
              },
              {
                'name': 'Daughter of A',
                'parent': 'Level 2: A',
              },
            ],
          },
          {
            'name': 'Level 2: B',
            'parent': 'Top Level',
          },
        ],
      },
    ];

    // get data from service

    // this.d3TreeService.getData().subscribe((data: any) => {
    //   this.data = data.data;
    // });


  }

  nodeUpdated(node: any){
    console.info('app detected node change');
  }
  nodeSelected(node: any){
    console.info('app detected node selected', node);
  }

}



