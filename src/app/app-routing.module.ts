import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Vistas/home/home.component';
import { LoginComponent } from './Vistas/login/login.component';
import { RegistroComponent } from './Vistas/registro/registro.component';
import { NotFoundComponent } from './Vistas/not-found/not-found.component';
import { QuienSoyComponent } from './Vistas/quien-soy/quien-soy.component';
import { DatosJugadorComponent } from './Vistas/datos-jugador/datos-jugador.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch:'full'},
  { path: 'home', component: HomeComponent, children: [
    { path: 'quien-soy', component: QuienSoyComponent },
    { path: '', component: DatosJugadorComponent },
    { path: 'juegos', loadChildren: () => import('./Modules/juegos/juegos.module').then(m => m.JuegosModule)},
  ] },
  { path: 'login', component: LoginComponent},
  { path: 'registro', component: RegistroComponent},
  { path: '**', component: NotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
