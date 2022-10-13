import { Component, Input, OnInit } from '@angular/core';
import { FirestoreService } from '../../../providers/firestore.service';
import { Puntaje } from '../../../Entidades/puntaje';
import { Fecha } from '../../../Entidades/fecha';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {

  @Input()
  public documentJuego: string | undefined;

  public listaScore: {puntaje: Puntaje, jugadorName: string}[] = [];
  public clase: string;

  constructor(private firestore: FirestoreService) {
    this.clase = 'collapse';
  }

  ngOnInit(): void {
    this.firestore.getDocuments(this.documentJuego!).subscribe(puntajes => {
      this.listaScore = [];
      puntajes.forEach((puntaje)=>{
        const score: Puntaje = puntaje as Puntaje;
        this.firestore.getUsuarioByUID(score.data.uidUser)
        .then((user)=>{
          let jugadorPuntaje: string = 'N/A';

          if(user.get('displayName') === null || user.get('displayName') === undefined){
            jugadorPuntaje = user.get('email');
          }
          else{
            jugadorPuntaje = user.get('displayName');
          }
          this.listaScore.push({puntaje: score, jugadorName: jugadorPuntaje});

          this.listaScore.sort((puntajeA, puntajeB) =>{
            return puntajeB.puntaje.data.score - puntajeA.puntaje.data.score;
          });

          this.listaScore = this.listaScore.slice(0,10);
        });
      });
    });
  }

  toggleCollapse(){
    if(this.clase === 'slide-in-left'){
      console.log('Ocultar');
      this.clase = 'slide-out-left';
    }
    else{
      console.log('Mostrar');
      this.clase = 'slide-in-left';
    }
  }

  getFechaFormat(ts: number): string{
    const fecha: Fecha = new Fecha(ts.toString());
    return fecha.getFechaCompleta();
  }
}
