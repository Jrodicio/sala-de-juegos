import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../providers/auth.service';
import { ImgPreguntadosApiService } from '../../../providers/img-preguntados-api.service';
import { FirestoreService } from '../../../providers/firestore.service';
import { Preguntas } from '../../../Entidades/preguntas';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnInit {

  public documentPuntaje: string = 'puntaje-preguntados';

  public uidUser: string | undefined;

  public juegoIniciado = false;
  public nivelSuperado = false;
  public nivelPerdido = false;
  public botonesDeshabilitados = true;
  public mostrarSpinner = false;

  public puntaje = 0;
  public nivel = 0;

  private preguntas: Preguntas[] = Preguntas.GenerarPreguntas();
  public preguntaImg: string = '';
  public preguntaStr: string = '';
  public respuestas: {respuesta: string, clase: string}[] = [{respuesta: '', clase: ''},{respuesta: '', clase: ''},{respuesta: '', clase: ''},{respuesta: '', clase: ''}]
  private idRespuestaCorrecta: number = 0;

  constructor(private authService: AuthService, private imgPreguntadosApiService : ImgPreguntadosApiService, private firestore: FirestoreService) { }

  ngOnInit(): void {
    this.authService.estaLogueado((e)=>{
      this.uidUser = e?.uid;
      console.log('uid:',this.uidUser);
    });
  }

  public iniciarJuego(){
    this.puntaje = 0;
    this.nivel = 0;
    this.nuevoNivel();
    this.juegoIniciado = true;
    this.nivelPerdido = false;
    this.nivelSuperado = false;

    console.log("Juego iniciado");
  }

  //Al asignar un nuevo nivel, mostramos spinner de carga, obtenemos palabra y reseteamos a 0 las fallas del nivel actual y ocultamos spinner al finalizar.
  public nuevoNivel(){
    this.mostrarSpinner = true;

    this.SiguientePregunta();
    this.nivel++;
    this.botonesDeshabilitados = false;
    this.nivelSuperado = false;
    this.mostrarSpinner = false;
  }



  public SiguientePregunta(){
    if(this.nivel == this.preguntas.length){
      this.preguntas = this.preguntas.concat(this.preguntas);
    }
    this.preguntaStr = this.preguntas[this.nivel].pregunta;
    this.obtenerImagen(this.preguntas[this.nivel].idImagen);

    for(let i = 0; i<4; i++){
      this.respuestas[i].respuesta = this.preguntas[this.nivel].respuestas[i];
      this.respuestas[i].clase = 'btn-light'
    }

    this.idRespuestaCorrecta = this.preguntas[this.nivel].indexRespuesta;

  }

  public obtenerImagen(idImagen: number){
    return this.imgPreguntadosApiService.ObtenerFoto(idImagen)
    .subscribe(
      foto => {
        this.preguntaImg = JSON.parse(JSON.stringify(foto)).src.medium;
      }
    )
  }

  public Responder(idRespuesta: number){
    if (idRespuesta !== this.idRespuestaCorrecta){
      this.respuestas[idRespuesta].clase = 'btn-danger';
      this.gameOver();
    }
    else{
      this.SumarPuntaje();
      this.nivelSuperado = true;
    }

    this.botonesDeshabilitados = true;
    this.respuestas[this.idRespuestaCorrecta].clase = 'btn-success';
  }

    public gameOver(){
    //Subir puntaje;
    this.nivelPerdido = true;
    this.registrarPuntaje();
  }

  private SumarPuntaje(){
    this.puntaje += this.nivel;
  }

  registrarPuntaje(){
    return this.firestore.addDataLogTS(this.documentPuntaje ,{uidUser: this.uidUser, score: this.puntaje});
  }
}
