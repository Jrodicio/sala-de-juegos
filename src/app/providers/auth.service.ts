import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Fecha } from 'src/app/Entidades/fecha';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  // public loginsRef: AngularFireList<any>;
  public userData: any;

  constructor(
    public angularFireAuth: AngularFireAuth,
    // private db: AngularFireDatabase
  ) {
    // this.loginsRef = this.db.list('/loginUsuarios');
    this.angularFireAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  createUser(user:{correo:string, contrasena:string}) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.createUserWithEmailAndPassword(user.correo, user.contrasena)
        .then(
          res => resolve(res),
          err => reject(err));
    });
  }

  signinUser(user:{correo:string, contrasena:string}) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.signInWithEmailAndPassword(user.correo, user.contrasena)
        .then(
          res => resolve(res),
          err => reject(err));
    });
  }

  signoutUser() {
    return new Promise<void>((resolve, reject) => {
      if (this.angularFireAuth.currentUser !== null) {
        this.angularFireAuth.signOut()
          .then(() => {
            resolve();
          }).catch(() => {
            reject();
          });
      }
    });
  }

  userDetails() {
    return this.angularFireAuth.user;
  }

  addLoginDB(email: string){
    let ts = new Fecha();
    // console.log({fecha: ts.date, usuario:email})
    // this.loginsRef.push({fecha: ts.date, usuario:email});
  }
}

