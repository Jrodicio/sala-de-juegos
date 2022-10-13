import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { FirestoreService } from '../../providers/firestore.service';
import { Fecha } from '../../Entidades/fecha';

@Component({
  selector: 'app-respuestas-encuesta',
  templateUrl: './respuestas-encuesta.component.html',
  styleUrls: ['./respuestas-encuesta.component.css']
})
export class RespuestasEncuestaComponent implements OnInit {

  public listaEncuestas: {encuesta:any, jugador:string}[] = [];
  public encuestaMostrar: any;

  constructor(private firestore: FirestoreService) { }

  ngOnInit(): void {
    this.firestore.getDocuments('encuestas').subscribe((encuestas) => {
      this.listaEncuestas = [];
      encuestas.forEach((encuesta:any)=>{
        console.log(encuesta.data);
        this.firestore.getUsuarioByUID(encuesta.data.jugador)
        .then((user)=>{
          let jugadorEncuesta: string = 'N/A';
          jugadorEncuesta = user.get('email');
          this.listaEncuestas.push({encuesta: encuesta, jugador: jugadorEncuesta});
          this.listaEncuestas.sort((encuestaA, encuestaB) =>{
            return encuestaB.encuesta.ts - encuestaA.encuesta.ts;
          });
        });
      });
    });
  }

  getFechaFormat(ts: number): string{
    const fecha: Fecha = new Fecha(ts.toString());
    return fecha.getFechaCompleta();
  }

  seleccionarEncuesta(encuesta:any){
    this.encuestaMostrar = encuesta;
    console.log(encuesta);
  }

}
