import { Component, ViewEncapsulation } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NodeDataService } from './d3-tree.service';

declare var d3: any;

@Component({
  selector: 'ngx-d3-tree',
  templateUrl: './d3-tree.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
    .node {
      cursor: pointer;
  }
  .node circle {
      fill: #fff;
      stroke: black ;
      stroke-width: 1.5px;
  }
  .node text {
      font: 10px sans-serif;
      color:#fff;
  }
  .link {
      fill: none;
      stroke: black;
      stroke-width: 1.5px;
  }
  `],
  encapsulation: ViewEncapsulation.None,
})
export class D3TreeComponent {
    constructor(private _nodeDataService: NodeDataService) {

    }

    ngOnInit() {
      this.loadData();
    }

    loadData (){
      var treeData = [
        {
          "name": "Top Level",
          "parent": "null",
          "children": [
            {
              'name': 'Level 2: A',
              'parent': 'Top Level',
              'children': [
                {
                  'name': 'Son of A',
                  'parent': 'Level 2: A',
                  'children': [
                    {
                      'name': 'Grand Son of A',
                      'parent': 'Son of A',

                    },
                    {
                      'name': 'Grand Daughter of A',
                      'parent': 'Son of A',
                    },
                  ],

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
              'children': [
                {
                  'name': 'Son of B',
                  'parent': 'Level 2: B',
                },
                {
                  'name': 'Daughter of B',
                  'parent': 'Level 2: B',
                },
              ],
            },
          ],
        },
      ];


      // ************** Generate the tree diagram	 *****************
      const margin = {top: 20, right: 120, bottom: 20, left: 120},
        width = 960 - margin.right - margin.left,
        height = 500 - margin.top - margin.bottom;

      let i = 0,
        duration = 750,
        root;

      const tree = d3.layout.tree()
        .size([height, width]);

      const diagonal = d3.svg.diagonal()
        .projection(function(d) { return [d.y, d.x]; });

      const svg = d3.select('#body').append('svg')
        .attr('width', width + margin.right + margin.left)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      root = treeData[0];
      root.x0 = height / 2;
      root.y0 = 0;

      update(root);

      d3.select(self.frameElement).style('height', '500px');

      function update(source) {

        // Compute the new tree layout.
        const nodes = tree.nodes(root).reverse(),
          links = tree.links(nodes);

        // Normalize for fixed-depth.
        nodes.forEach(function(d) { d.y = d.depth * 180; });

        // Update the nodes…
        const node = svg.selectAll('g.node')
          .data(nodes, function(d) { return d.id || (d.id = ++i); });

        // Enter any new nodes at the parent's previous position.
        const nodeEnter = node.enter().append('g')
          .attr('class', 'node')
          .attr('transform', function(d) { return 'translate(' + source.y0 + ',' + source.x0 + ')'; })
          .on('click', click);

        nodeEnter.append('circle')
          .attr('r', 1e-6)
          .style('fill', function(d) { return d._children ? 'lightsteelblue' : '#fff'; });

        nodeEnter.append('text')
          .attr('x', function(d) { return d.children || d._children ? -13 : 13; })
          .attr('dy', '.35em')
          .attr('text-anchor', function(d) { return d.children || d._children ? 'end' : 'start'; })
          .text(function(d) { return d.name; })
          .style('fill-opacity', 1e-6)
          .style('fill', 'white');

        // Transition nodes to their new position.
        const nodeUpdate = node.transition()
          .duration(duration)
          .attr('transform', function(d) { return 'translate(' + d.y + ',' + d.x + ')'; });

        nodeUpdate.select('circle')
          .attr('r', 10)
          .style('fill', function(d) { return d._children ? 'lightsteelblue' : '#fff'; });

        nodeUpdate.select('text')
          .style('fill-opacity', 1);

        // Transition exiting nodes to the parent's new position.
        const nodeExit = node.exit().transition()
          .duration(duration)
          .attr('transform', function(d) { return 'translate(' + source.y + ',' + source.x + ')'; })
          .remove();

        nodeExit.select('circle')
          .attr('r', 1e-6);

        nodeExit.select('text')
          .style('fill-opacity', 1e-6);

        // Update the links…
        const link = svg.selectAll('path.link')
          .data(links, function(d) { return d.target.id; });

        // Enter any new links at the parent's previous position.
        link.enter().insert('path', 'g')
          .attr('class', 'link')
          .attr('d', function(d) {
          const o = {x: source.x0, y: source.y0};
          return diagonal({source: o, target: o});
          });

        // Transition links to their new position.
        link.transition()
          .duration(duration)
          .attr('d', diagonal);

        // Transition exiting nodes to the parent's new position.
        link.exit().transition()
          .duration(duration)
          .attr('d', function(d) {
          const o = {x: source.x, y: source.y};
          return diagonal({source: o, target: o});
          })
          .remove();

        // Stash the old positions for transition.
        nodes.forEach(function(d) {
        d.x0 = d.x;
        d.y0 = d.y;
        });
      }

      // Toggle children on click.
      function click(d) {
        if (d.children) {
        d._children = d.children;
        d.children = null;
        } else {
        d.children = d._children;
        d._children = null;
        }
        update(d);
      }
    }



}



