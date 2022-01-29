import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesComponent } from './clientes/clientes.component';
import { DemoMaterialModule } from '../material.module';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { RouterModule } from '@angular/router';
import { PagesRoutingModule } from './pages.routing';



@NgModule({
  declarations: [
    ClientesComponent,
    NoPageFoundComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    RouterModule,
    PagesRoutingModule
  ], 
  exports: [
    ClientesComponent,
    NoPageFoundComponent
  ]
})
export class PagesModule { }
