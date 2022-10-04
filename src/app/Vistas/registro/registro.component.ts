import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth.service';
import { Router } from '@angular/router';
import { FirestoreService } from '../../providers/firestore.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public estaCargando: boolean = false;
  public loginForm: FormGroup;
  public errorRegistro:{message: string, opacity: number};

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private firestoreService: FirestoreService,
    private router: Router,
  ) {
    this.loginForm = this.formBuilder.group({
      correo: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ])),
      contrasena: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
      contrasenaConfirmada: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });

    this.errorRegistro = {message: '', opacity: 0};
   }

  ngOnInit(): void {
  }

  get fm(){
    return this.loginForm.controls;
  }

  registrarUsuario(){
    this.errorRegistro = {message: '', opacity: 0};
    if(this.fm['contrasena'].value.toString() === this.fm['contrasenaConfirmada'].value.toString()){
      this.estaCargando = true;
      let user = {correo: this.fm['correo'].value.toString(), contrasena: this.fm['contrasena'].value.toString()};
      this.authService.createUser(user)
        .then(()=>{
          this.authService.signinUser(user)
          .then(response => {
            const userData = {uid:response.user.uid, photoURL: response.user.photoURL, email: response.user.email, displayName: response.user.displayName};
            this.firestoreService.setDocument('users',userData.uid, userData);
            this.firestoreService.addDataLogTS('logins',userData.uid);
            this.router.navigate(['/home']);
          })
        })
        .catch(error => {
          if (error.code == 'auth/email-already-in-use'){
            this.mostrarError('El correo ya se encuentra registrado.');
          }
          else{
            this.mostrarError('No se ha podido registrar al usuario.');
          }
        })
        .finally(()=>{this.estaCargando = false});
    }
    else{
      console.log('Las contraseñas no coinciden');
    }
  }

  ocultarError(){
    if (this.errorRegistro.opacity > 0){
      setTimeout(()=>{
        this.errorRegistro.opacity -= 0.01
        console.log(this.errorRegistro);
        this.ocultarError();
      }, 10)
    }
    else {
      this.errorRegistro.message = '';
    }
  }

  mostrarError(message:string){
    this.errorRegistro.message = message;
    if (this.errorRegistro.opacity < 1){
      setTimeout(()=>{
        this.errorRegistro.opacity += 0.005
        this.mostrarError(message);
      }, 1)
    }
    else {
      setTimeout(() =>{
        this.ocultarError();
      }, 1500);
    }
  }
}
