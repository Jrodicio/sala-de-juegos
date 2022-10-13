import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing.module';
import { JuegosComponent } from '../../Vistas/juegos/juegos.component';

import { AhorcadoComponent } from 'src/app/Vistas/juegos/ahorcado/ahorcado.component';
import { MayorOMenorComponent } from 'src/app/Vistas/juegos/mayor-o-menor/mayor-o-menor.component';
import { PreguntadosComponent } from '../../Vistas/juegos/preguntados/preguntados.component';
import { LetrasComponent } from '../../Vistas/juegos/ahorcado/letras/letras.component';
import { EscapeDinosaurioComponent } from '../../Vistas/juegos/escape-dinosaurio/escape-dinosaurio.component';

import { ListadoJuegosComponent } from '../../Vistas/juegos/listado-juegos/listado-juegos.component';

import { PalabrasApiService } from 'src/app/providers/palabras-api.service';
import { ScoreboardComponent } from '../../Vistas/juegos/scoreboard/scoreboard.component';

@NgModule({
  declarations: [
    ListadoJuegosComponent,
    JuegosComponent,
    AhorcadoComponent,
    MayorOMenorComponent,
    PreguntadosComponent,
    LetrasComponent,
    EscapeDinosaurioComponent,
    ScoreboardComponent,
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule,
  ],
  providers: [
    PalabrasApiService,
  ],
})
export class JuegosModule { }
