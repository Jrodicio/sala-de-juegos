import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../providers/auth.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public jugador: User | null;

  constructor(private authService: AuthService) {
    this.jugador = null;

    this.authService.estaLogueado((user) =>{
      if(user){
        this.jugador = user;
      }
      else{
        this.jugador = null;
      }
    });
   }

  ngOnInit(): void {
  }

}
