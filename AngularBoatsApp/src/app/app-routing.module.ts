import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BoatsComponent } from './boats/boats.component';


const routes: Routes = [
{path:'boats',component:BoatsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
