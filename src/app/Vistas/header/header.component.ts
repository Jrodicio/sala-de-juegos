import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../providers/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public estaLogueado: boolean = false;

  constructor(
    public authService: AuthService,
  ) {

    authService.angularFireAuth.authState.subscribe((user) => {
      if (user){
        this.estaLogueado = true;
      }
      else{
        this.estaLogueado = false;
      }
    })

   }
  ngOnInit(): void {
  }

  desloguear(){
    this.authService.signoutUser();
  }
}
