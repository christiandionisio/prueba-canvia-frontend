import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesComponent } from './clientes/clientes.component';
import { DemoMaterialModule } from '../material.module';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { RouterModule } from '@angular/router';
import { PagesRoutingModule } from './pages.routing';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { ItemsComponent } from './items/items.component';




@NgModule({
  declarations: [
    ClientesComponent,
    NoPageFoundComponent,
    ItemsComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    RouterModule,
    PagesRoutingModule,
    FormsModule,
    ComponentsModule
  ], 
  exports: [
    ClientesComponent,
    NoPageFoundComponent
  ]
})
export class PagesModule { }
