import { Fecha } from './fecha';

export class Mensaje {
  uid: string;
  texto: string;
  ts: number;
  id: string | undefined;

  constructor(uid:string, texto:string, ts?: number, id?: string){
    this.uid = uid;
    this.texto = texto;

    if(ts === undefined){
      this.ts = new Fecha(new Date()).toNumber();
        }
    else{
      this.ts = ts;
    }

    if(id !== undefined){
      this.id = id;
    }
  }

  toJson(){
    return {uid: this.uid, texto: this.texto, ts: this.ts};
  }

  getFechaHora(): string{
    const fechaHora: Fecha = new Fecha(this.ts.toString());
    return fechaHora.getFechaCompleta();
  }

  public static fromJson(jsonMensaje: {uid: string, texto: string, ts: number, id?: string}): Mensaje{
    return new Mensaje(jsonMensaje.uid, jsonMensaje.texto, jsonMensaje.ts, jsonMensaje.id);
  }

  public static fromJsonArray(arrayJsonMensaje:{uid: string, texto: string, ts: number, id?: string}[]): Mensaje[]{
    let listaMensajes: Mensaje[] = [];    arrayJsonMensaje.forEach((value) =>{
      listaMensajes.push(Mensaje.fromJson(value));
    });
    return listaMensajes;
  }

}
