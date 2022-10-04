import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, User, NextOrObserver } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public userData: any;

  constructor(
    private angularFireAuth: Auth,
  ) {
    onAuthStateChanged(angularFireAuth, (user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.userData = user;
      } else {
        localStorage.removeItem('user');
        this.userData = user;
      }
    });
  }

  createUser(user:{correo:string, contrasena:string}) {
    return createUserWithEmailAndPassword(this.angularFireAuth, user.correo, user.contrasena);
  }

  signinUser(user:{correo:string, contrasena:string}) {
    return signInWithEmailAndPassword(this.angularFireAuth, user.correo, user.contrasena);
  }

  signoutUser() {
    return signOut(this.angularFireAuth)
  }

  userDetails() {
    return this.angularFireAuth.currentUser;
  }

  actualizarPerfil(displayName:string, photoURL?: string){
    return updateProfile(this.userData,{displayName, photoURL});
  }

  estaLogueado(observer: NextOrObserver<User | null>){
    return this.angularFireAuth.onAuthStateChanged(observer);
  }



}
