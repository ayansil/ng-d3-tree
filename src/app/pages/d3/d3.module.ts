import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { D3RoutingModule, routedComponents } from './d3-routing.module';


@NgModule({
  imports: [
    ThemeModule,
    D3RoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class D3Module { }
