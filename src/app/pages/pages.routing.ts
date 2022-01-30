
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ClientesComponent } from './clientes/clientes.component';
import { ItemsComponent } from './items/items.component';



const routes: Routes = [
    { path: 'dashboard/clientes', component: ClientesComponent },
    { path: 'dashboard/items', component: ItemsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})  
export class PagesRoutingModule {}