import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HomeComponent } from './Vistas/home/home.component';
import { LoginComponent } from './Vistas/login/login.component';
import { RegistroComponent } from './Vistas/registro/registro.component';
import { NotFoundComponent } from './Vistas/not-found/not-found.component';
import { QuienSoyComponent } from './Vistas/quien-soy/quien-soy.component';
import { DatosJugadorComponent } from './Vistas/datos-jugador/datos-jugador.component';
import { EncuestaComponent } from './Vistas/encuesta/encuesta.component';
import { RespuestasEncuestaComponent } from './Vistas/respuestas-encuesta/respuestas-encuesta.component';
import { OnlyAdminGuard } from './guards/only-admin.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch:'full'},
  { path: 'home', component: HomeComponent, children: [
    { path: '', component: DatosJugadorComponent },
    { path: 'quien-soy', component: QuienSoyComponent },
    { path: 'encuesta', component: EncuestaComponent },
    { path: 'respuestas-encuesta', component: RespuestasEncuestaComponent, canActivate:[OnlyAdminGuard] },
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
