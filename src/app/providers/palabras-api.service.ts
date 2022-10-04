import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PalabrasApiService {

  private apiUrl: string = 'https://clientes.api.greenborn.com.ar/public-random-word?c=1&l='

  constructor(
    private http: HttpClient,
  ) { }

  obtenerPalabra(largo:number): Observable<any> {
    return this.http.get(this.apiUrl + largo.toString());
  }
}
