import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../providers/firestore.service';
import { AuthService } from '../../../providers/auth.service';

@Component({
  selector: 'app-mayor-o-menor',
  templateUrl: './mayor-o-menor.component.html',
  styleUrls: ['./mayor-o-menor.component.css']
})
export class MayorOMenorComponent implements OnInit {

  public documentPuntaje: string = 'puntaje-mayorMenor';

  public uidUser: string | undefined;

  public juegoIniciado = false;
  public nivelSuperado = false;
  public nivelPerdido = false;

  public mostrarSpinner = false;

  public puntaje = 0;
  public nivel = 0;

  public cartas = [ ['pica', 1,2,3,4,5,6,7,8,9,10,11,12,13],
                    ['corazon', 1,2,3,4,5,6,7,8,9,10,11,12,13],
                    ['trebol', 1,2,3,4,5,6,7,8,9,10,11,12,13],
                    ['diamante', 1,2,3,4,5,6,7,8,9,10,11,12,13] ]

  public cartasRestantes: number = 0;

  public cartaSacada: {palo: string, numeroCarta: number} | undefined;
  public cartaAnterior: {palo: string, numeroCarta: number} | undefined;

  public mensajeCarta: string = '';

  private mensajesBuenos = ['Xelente!','Eso estuvo cerca!','izi','ez','ggwp','Safaste!','Bien!','Adentrooooo', 'UFFFFFFFFFFFFFFF','DALE BOKEE'];

  constructor(
    private firestore: FirestoreService,
    private authService: AuthService,
    ) { }

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
    this.mensajeCarta = "";
    this.habilitarBotonesJuego(true);
    console.log("Juego iniciado");
  }

  //Al asignar un nuevo nivel, mostramos spinner de carga, obtenemos palabra y reseteamos a 0 las fallas del nivel actual y ocultamos spinner al finalizar.
  public nuevoNivel(){
    this.mostrarSpinner = true;
    this.nivel++;
    this.cartas = [ ['pica', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                    ['corazon', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                    ['trebol', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                    ['diamante', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] ];

    this.calcularCartasRestantes();
    this.sacarCarta();

    this.nivelSuperado = false;
    this.mostrarSpinner = false;
  }

  public sacarCarta(){
    const tipo = Math.floor(Math.random() * this.cartas.length);
    const carta = Math.floor(Math.random() * ((this.cartas[tipo].length - 1) - 1 + 1) + 1);

    this.cartaAnterior = this.cartaSacada;
    this.cartaSacada = {palo: this.cartas[tipo][0].toString(), numeroCarta: parseInt(this.cartas[tipo].splice(carta,1).join(''))};

    if(this.cartas[tipo].length == 1){
      this.cartas.splice(tipo,1);
    }
    this.calcularCartasRestantes();

    if (this.cartasRestantes == 0){
      this.nivelSuperado = true;
    }
  }

  public animarCartaSacada(){
    document.getElementsByClassName("not-flip-in-hor-bottom")[0].className = 'img-juego flip-in-hor-bottom';
    setTimeout(()=>{
      document.getElementsByClassName("flip-in-hor-bottom")[0].className = 'img-juego not-flip-in-hor-bottom'
    },850);
  }

  public habilitarBotonesJuego(habilitado: boolean){
    if(habilitado){
      document.getElementsByClassName("btn-menor")[0].removeAttribute('disabled');
      document.getElementsByClassName("btn-mayor")[0].removeAttribute('disabled');
    }
    else{
      document.getElementsByClassName("btn-menor")[0].setAttribute('disabled','true');
      document.getElementsByClassName("btn-mayor")[0].setAttribute('disabled','true');
    }
  }

  public calcularCartasRestantes(){
    this.cartasRestantes = 0;
    for(let i = 0; i<this.cartas.length; i++){
      for(let j = 1; j<this.cartas[i].length; j++){
        this.cartasRestantes++;
      }
    }
  }

  public adivinarSiguiente(siguienteCarta: string){
    this.habilitarBotonesJuego(false);
    this.sacarCarta();
    if ((siguienteCarta == 'mayor' && this.cartaSacada!.numeroCarta > this.cartaAnterior!.numeroCarta) || (siguienteCarta == 'menor' && this.cartaSacada!.numeroCarta < this.cartaAnterior!.numeroCarta)){
      //Suma puntos
      this.puntaje++;
      this.mensajeCarta = this.mensajesBuenos[Math.floor(Math.random()*this.mensajesBuenos.length)];
      this.habilitarBotonesJuego(true);
    }
    else if((siguienteCarta == 'mayor' && this.cartaSacada!.numeroCarta < this.cartaAnterior!.numeroCarta) || (siguienteCarta == 'menor' && this.cartaSacada!.numeroCarta > this.cartaAnterior!.numeroCarta)){
      //Game over
      this.mensajeCarta="FIN DEL JUEGO";

      setTimeout(() => {
        this.gameOver();
      }, 500);
    }
    else if (this.cartaSacada!.numeroCarta == this.cartaAnterior!.numeroCarta){
      //Pasa de largo
      this.mensajeCarta="¡Iguales! Safaste";
      this.habilitarBotonesJuego(true);
    }
  }

  public gameOver(){
    //Subir puntaje;
    this.nivelPerdido = true;
    this.habilitarBotonesJuego(false);
    this.registrarPuntaje();
  }

  registrarPuntaje(){
    return this.firestore.addDataLogTS(this.documentPuntaje ,{uidUser: this.uidUser, score: this.puntaje});
  }
}

