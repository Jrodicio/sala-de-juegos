import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../providers/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quien-soy',
  templateUrl: './quien-soy.component.html',
  styleUrls: ['./quien-soy.component.css']
})
export class QuienSoyComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    authService.angularFireAuth.authState.subscribe((user) => {
      if (!user){
        this.router.navigate(['login']);
      }
    })
  }

  ngOnInit(): void {
  }

}
