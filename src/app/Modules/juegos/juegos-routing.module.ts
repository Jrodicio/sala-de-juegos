import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegosComponent } from '../../Vistas/juegos/juegos.component';
import { AhorcadoComponent } from '../../Vistas/juegos/ahorcado/ahorcado.component';
import { MayorOMenorComponent } from '../../Vistas/juegos/mayor-o-menor/mayor-o-menor.component';
import { NotFoundComponent } from '../../Vistas/not-found/not-found.component';
import { PreguntadosComponent } from '../../Vistas/juegos/preguntados/preguntados.component';
import { ListadoJuegosComponent } from '../../Vistas/juegos/listado-juegos/listado-juegos.component';
import { EscapeDinosaurioComponent } from '../../Vistas/juegos/escape-dinosaurio/escape-dinosaurio.component';

const routes: Routes = [
  { path: '', component: JuegosComponent, children:[
    {path: '', component: ListadoJuegosComponent},
    { path: 'ahorcado', component: AhorcadoComponent },
    { path: 'mayor-o-menor', component: MayorOMenorComponent },
    { path: 'preguntados', component: PreguntadosComponent },
    { path: 'ahorcado', component: AhorcadoComponent },
    { path: 'escape-dinosaurio', component: EscapeDinosaurioComponent },
    { path: '**', component: NotFoundComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
