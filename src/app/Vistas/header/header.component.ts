import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../providers/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public estaLogueado: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router){
      this.authService.estaLogueado((user) =>{
        if(user){
          this.estaLogueado = true;
        }
        else{
          this.estaLogueado = false;
          this.router.navigate(['login']);
        }
      });
   }
  ngOnInit(): void {
  }

  desloguear(){
    this.authService.signoutUser();
    this.router.navigate(['login']);
  }
}
