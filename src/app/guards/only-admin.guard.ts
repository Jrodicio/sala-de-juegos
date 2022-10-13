import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../providers/auth.service';
import { FirestoreService } from '../providers/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class OnlyAdminGuard implements CanActivate {
uidAdmins = ['r4fOSyNyP8dJE10z2GoZKTEnZUj1'];
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(localStorage.getItem('user') !== null && localStorage.getItem('user') !== undefined){
        const uid: string = JSON.parse(localStorage.getItem('user')!).uid;
        if (this.uidAdmins.includes(uid)){
          return true
        }
      }
      alert("Sin permisos");
      return false;
  }

}
