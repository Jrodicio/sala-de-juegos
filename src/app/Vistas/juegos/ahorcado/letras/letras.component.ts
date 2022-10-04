import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-letras',
  templateUrl: './letras.component.html',
  styleUrls: ['./letras.component.css']
})
export class LetrasComponent implements OnInit {

  @Output()
    letrasEvento = new EventEmitter<string>();

  @Input()
    letrasActivas: boolean | undefined;

  public letras = [
    {letter:"A", activo: false, index:0},{letter:"B", activo: false},{letter:"C", activo: false},{letter:"D", activo: false},{letter:"E", activo: false},{letter:"F", activo: false},
    {letter:"G", activo: false},{letter:"H", activo: false},{letter:"I", activo: false},{letter:"J", activo: false},{letter:"K", activo: false},{letter:"L", activo: false},
    {letter:"M", activo: false},{letter:"N", activo: false},{letter:"Ñ", activo: false},{letter:"O", activo: false},{letter:"P", activo: false},{letter:"Q", activo: false},
    {letter:"R", activo: false},{letter:"S", activo: false},{letter:"T", activo: false},{letter:"U", activo: false},{letter:"V", activo: false},{letter:"W", activo: false},
    {letter:"X", activo: false},{letter:"Y", activo: false},{letter:"Z", activo: false}];

  constructor() {
   }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['letrasActivas'].currentValue){
      this.habilitarLetras();
    }
    else{
      this.deshabilitarLetras();
    }
  }

  habilitarLetras(){
    console.log("SE EJECUTA JUEGO INICIADO EN LETRAS")
    for(let i=0; i<this.letras.length; i++){
      this.letras[i].activo = true;
    }
  }

  deshabilitarLetras(){
    for(let i=0; i<this.letras.length; i++){
      this.letras[i].activo = false;
    }
  }

  pulsarLetra(letra: string){
    let letraEncontrada = this.letras.find(letras => letras.letter == letra);

    if(letraEncontrada != undefined){
      letraEncontrada.activo = false;
    }

    this.letrasEvento.emit(letra);
  }
}
