import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AuthService } from '../../providers/auth.service';
import { Fecha } from '../../Entidades/fecha';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { StorageService } from '../../providers/storage.service';
import { FirestoreService } from '../../providers/firestore.service';
import { getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-datos-jugador',
  templateUrl: './datos-jugador.component.html',
  styleUrls: ['./datos-jugador.component.css']
})
export class DatosJugadorComponent implements OnInit {

  public jugador: User | null;
  public editForm: FormGroup;
  public editandoPerfil: boolean = false;
  private fotoPerfil: File | undefined;

  constructor(
    private authService: AuthService,
    private firestore: FirestoreService,
    private storageService: StorageService,
    private formBuilder: FormBuilder,
  ) {
    this.jugador = null;

    this.authService.estaLogueado((user) =>{
      if(user){
        this.jugador = user;
      }
      else{
        this.jugador = null;
      }
    });

    this.editForm = this.formBuilder.group({
      displayName: new FormControl(''),
      photoURL: new FormControl('')});
  }

  ngOnInit(): void {
  }

  jugadorLastLogin(){
    let fecha = new Fecha(new Date(this.jugador?.metadata?.lastSignInTime!));
    return fecha.getFechaCompleta();
  }

  jugadorCreationTime(){
    let fecha = new Fecha(new Date(this.jugador?.metadata?.creationTime!));
    return fecha.getFechaCompleta();
  }

  toggleEditandoPerfil(){
    this.editandoPerfil = !this.editandoPerfil;
    if(this.editandoPerfil){
      this.editForm.controls['displayName'].setValue(this.jugador?.displayName);
    }
  }

  actualizarPerfil(){
    let displayName = this.editForm.controls['displayName'].value;
    let photoURL = this.editForm.controls['photoURL'].value;

    if(displayName.length > 0){
      if(photoURL.length > 0){
        this.storageService.subirImagenPerfil(this.fotoPerfil!, this.jugador!.uid)
        .then(()=>{
          this.storageService.getURLProfile(this.jugador!.uid)
          .then(photoURL => {
            this.authService.actualizarPerfil(displayName, photoURL)
            .then(()=>{
              this.jugador?.reload();
              const userData = {uid:this.jugador!.uid, photoURL: photoURL, email: this.jugador!.email, displayName: displayName};
              this.firestore.setDocument('users',userData.uid, userData);
            })
          })
          .catch(error => console.log("ERROR:",error));
        });
      }
      else{
        this.authService.actualizarPerfil(displayName)
        .then(()=>{
          const userData = {uid:this.jugador!.uid, photoURL: this.jugador!.photoURL, email: this.jugador!.email, displayName: this.jugador!.displayName};
          this.firestore.setDocument('users',userData.uid, userData);
        })
      }
      this.toggleEditandoPerfil();
    }
  }

  cancelar(){

    this.editForm.controls['displayName'].setValue('');
    this.editForm.controls['photoURL'].setValue('');
    this.fotoPerfil = undefined;
    this.toggleEditandoPerfil();
  }

  subirImagen($event: any){
    const file = $event.target.files[0] as File;
    this.fotoPerfil = file;
  }

}
