import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormularioComponent } from './componentes/formulario/formulario/formulario.component';
import { ProspectosComponent } from './componentes/formulario/prospectos/prospectos.component';

const routes: Routes = [
  { path: "home", component: ProspectosComponent },
  { path: "crear", component: FormularioComponent },
  { path: "editar/:id", component: FormularioComponent },
  { path: "**", pathMatch: "full", redirectTo: "home" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
