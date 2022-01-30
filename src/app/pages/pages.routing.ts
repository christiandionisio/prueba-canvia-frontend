
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ClientesComponent } from './clientes/clientes.component';
import { ItemsComponent } from './items/items.component';
import { FacturaComponent } from './factura/factura.component';



const routes: Routes = [
    { path: 'dashboard/clientes', component: ClientesComponent },
    { path: 'dashboard/items', component: ItemsComponent },
    { path: 'dashboard/facturas', component: FacturaComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})  
export class PagesRoutingModule {}