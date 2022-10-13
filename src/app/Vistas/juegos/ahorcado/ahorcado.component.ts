import { Component, Input, OnInit } from '@angular/core';
import { PalabrasApiService } from '../../../providers/palabras-api.service';
import { FirestoreService } from '../../../providers/firestore.service';
import { AuthService } from '../../../providers/auth.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {

  public uidUser: string | undefined;
  public documentPuntaje: string = 'puntaje-ahorcado';

  public juegoIniciado = false;
  public palabra: string[] = [];
  public palabraAdivinada: string[] = [];
  public mostrarSpinner = false;
  public nivel = 0;
  public cantFallas = 0;
  public puntaje = 0;

  public nivelSuperado = false;

  // palabra = this.palabras[Math.floor(Math.random() * this.palabras.length)];;

  constructor(
    private palabrasApi: PalabrasApiService,
    private firestore: FirestoreService,
    private authService: AuthService,

    ) {
  }

  ngOnInit(){
    this.authService.estaLogueado((e)=>{
      this.uidUser = e?.uid;
      console.log('uid:',this.uidUser);
    });
  }

  //Iniciamos juego, seteamos nivel y puntaje en 0, pasamos al nuevo nivel y marcamos flag juegoIniciado.
  public iniciarJuego(){
    this.puntaje = 0;
    this.nivel = 0;
    this.nuevoNivel();
    this.juegoIniciado = true;
    console.log("Juego iniciado");
  }

  public nuevoNivel(){
    this.mostrarSpinner = true;
    this.palabraAdivinada = [];
    this.obtenerPalabra().add(()=>{
      this.nivelSuperado = false;
      this.nivel++;
      this.cantFallas = 0;
      while(this.palabraAdivinada.length < this.palabra.length){
        this.palabraAdivinada.push('_');
      }

      this.mostrarSpinner = false;
    });
  }

  public obtenerPalabra(){
    return this.palabrasApi.obtenerPalabra(this.nivel+4)
    .subscribe(
      palabra => {
        this.palabra = palabra[0].toUpperCase().replace('Á','A').replace('É','E').replace('Í','I').replace('Ó','O').replace('Ú','U').replace('Ü','U').split('');
        console.log('palabra obtenida:', this.palabra);
      }
    )
  }

  public buscarLetra(letra: string){

    if(this.palabra.includes(letra)){
      for(let i = 0; i<this.palabra.length; i++){
        if(this.palabra[i] == letra){
          this.palabraAdivinada[i] = letra;
        }
      }
      //Pasar de nivel
      if (this.palabra.toString() == this.palabraAdivinada.toString()){
        //Calculamos puntaje acorde al nivel y la cantidad de fallas obtenidas.
        this.puntaje += this.nivel * 9 - this.cantFallas;
        //Mostramos mensaje de nivel superado y botón siguiente.
        this.nivelSuperado = true;
      }
    }
    else{
      this.cantFallas++;
      if(this.cantFallas == 9){
        this.gameOver();
      }
    }
  }

  public gameOver(){
    //Subir puntaje;
    this.palabraAdivinada = this.palabra;
    this.registrarPuntaje();
    this.juegoIniciado = false;
  }

  public finalizarJuego(){
    this.gameOver();
    this.nivel = 0;
    this.palabra = [];
    this.palabraAdivinada = [];
    this.cantFallas = 0;
    this.juegoIniciado = false;
  }

  registrarPuntaje(){
    return this.firestore.addDataLogTS(this.documentPuntaje ,{uidUser: this.uidUser, score: this.puntaje});
  }
}

