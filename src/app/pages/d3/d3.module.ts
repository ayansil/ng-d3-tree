import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { D3RoutingModule, routedComponents } from './d3-routing.module';
import { AngularD3TreeLibModule } from 'angular-d3-tree';

@NgModule({
  imports: [
    ThemeModule,
    D3RoutingModule,
    Ng2SmartTableModule,
    AngularD3TreeLibModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class D3Module { }
