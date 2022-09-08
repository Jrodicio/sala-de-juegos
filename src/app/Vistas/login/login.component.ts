import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public estaCargando: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  fakeLogin(): void{
    this.estaCargando = true;
    setTimeout(()=>this.estaCargando = false,3000);
  }

}
