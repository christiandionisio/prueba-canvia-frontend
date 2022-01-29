import {A11yModule} from '@angular/cdk/a11y';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {NgModule} from '@angular/core';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion'
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatTableModule,
    MatButtonModule
  ]
})
export class DemoMaterialModule {}