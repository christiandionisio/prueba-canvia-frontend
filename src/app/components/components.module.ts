import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteDialogComponent } from './cliente-dialog/cliente-dialog.component';
import { DemoMaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ClienteDialogComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    ClienteDialogComponent
  ]
})
export class ComponentsModule { }
