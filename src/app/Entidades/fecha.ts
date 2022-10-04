export class Fecha{

  año: number;
  mes: number;
  dia: number;
  horas: number;
  minutos: number;
  segundos: number;
  milesimas: number;

  constructor (fecha: Date | string){
    if (typeof fecha === 'string'){
      fecha = new Date( parseInt(fecha.substring(0,4)),
                        parseInt(fecha.substring(4,6)),
                        parseInt(fecha.substring(6,8)),
                        parseInt(fecha.substring(8,10)),
                        parseInt(fecha.substring(10,12)),
                        parseInt(fecha.substring(12,14)),
                        parseInt(fecha.substring(14,17)));
    }

    this.año = fecha.getFullYear();
    this.mes = fecha.getMonth() + 1;
    this.dia = fecha.getDate();
    this.horas = fecha.getHours();
    this.minutos = fecha.getMinutes();
    this.segundos = fecha.getSeconds();
    this.milesimas = fecha.getMilliseconds();
  }

  public toNumber(): number{
    return this.milesimas + this.segundos * 10**3 + this.minutos * 10**5 + this.horas * 10**7 + this.dia * 10**9 + this.mes * 10**11 + this.año * 10**13;
  }

  public getFecha():string{
    return Fecha.pad(this.dia,2) + '/' + Fecha.pad(this.mes,2) + '/' + Fecha.pad(this.año,4);
  }

  public getHorario(milisegundos?: boolean): string{
    let horario = Fecha.pad(this.horas,2) + ':' + Fecha.pad(this.minutos,2) + ':' + Fecha.pad(this.segundos,2);
    if (milisegundos){
      horario += '.' + Fecha.pad(this.milesimas,3);
    }
    return horario;
  }

  getFechaCompleta(){
    return this.getFecha()+' '+this.getHorario();
  }

  private static pad(datePart:number, padlen:number):string {
    var pad = new Array(1 + padlen).join('0');
    return (pad + datePart).slice(-pad.length);
  }



}
