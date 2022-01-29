
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ClientesComponent } from './clientes/clientes.component';



const routes: Routes = [
    { path: 'dashboard/clientes', component: ClientesComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})  
export class PagesRoutingModule {}