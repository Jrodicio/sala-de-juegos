import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Mensaje } from '../../Entidades/mensaje';
import { FirestoreService } from '../../providers/firestore.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input()
    uidUser: string | undefined;

  public mensajesFrom: {mensaje: Mensaje, from: string}[];
  public msjForm: FormGroup;
  public scrollTop: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private firestore: FirestoreService,
    ) {
    this.msjForm = this.formBuilder.group({
      mensaje: new FormControl('', Validators.compose([
        Validators.required,
      ]))});

    this.mensajesFrom = [];
    this.firestore.getDocuments('chat').subscribe(mensajes => {
      mensajes.forEach((mensaje)=>{
        const msj: Mensaje = Mensaje.fromJson(mensaje as Mensaje);
        this.getUsuarioMensaje(msj.uid)
        .then((user)=>{
          let fromMsj: string = 'N/A';

          if(user.get('displayName') === null || user.get('displayName') === undefined){
            fromMsj = user.get('email');
          }
          else{
            fromMsj = user.get('displayName');
          }
          if (this.mensajesFrom.find((a)=>{return a.mensaje.id === msj.id}) === undefined){
            this.mensajesFrom.push({mensaje: msj, from: fromMsj});
            this.mensajesFrom.sort((a,b)=>{
              return a.mensaje.ts - b.mensaje.ts;
            });
            setTimeout(()=>{
              this.recalcularScrollTop();
            }, 100);
          }
        });
      });
    });
  }

  ngOnInit(): void {

  }

  enviarMensaje(){
    if(this.uidUser !== undefined){
      let textoMensaje = this.msjForm.controls['mensaje'];
      const nuevoMensaje = new Mensaje(this.uidUser,textoMensaje.value);

      this.firestore.addData('/chat', nuevoMensaje.toJson());
      textoMensaje.setValue('');
    }
    else{
      throw new Error('Error de sistema: usuario sin UID');
    }
  }

  getUsuarioMensaje(uid: string){
    return this.firestore.getDocument('users', uid);
  }

  recalcularScrollTop(){
    this.scrollTop = this.mensajesFrom.length * 50;
  }
}

