import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { D3Component } from './d3.component';

import { D3TreeComponent } from './d3charts/d3-tree.component';

const routes: Routes = [{
  path: '',
  component: D3TreeComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class D3RoutingModule { }

export const routedComponents = [
  D3Component,
  D3TreeComponent,
];
