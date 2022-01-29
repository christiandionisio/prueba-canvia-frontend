
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { NoPageFoundComponent } from './pages/no-page-found/no-page-found.component';
import { PagesRoutingModule } from './pages/pages.routing';


const routes: Routes = [
    { path: '', redirectTo: '/dashboard/clientes', pathMatch: 'full'},
    { path: '**', component: NoPageFoundComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        PagesRoutingModule,
    ],
    exports: [RouterModule]
})  
export class AppRoutingModule {}