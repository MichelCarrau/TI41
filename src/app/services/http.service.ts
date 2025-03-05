import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';  // Importar of para manejar errores

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiURL = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  post(endpoint: string, data: any): Observable<any> {
    return this.httpClient.post(`${this.apiURL}/${endpoint}`, data)
      .pipe(
        catchError(error => {
          console.error('Error en la solicitud POST', error);
          return of({ ok: false, message: 'Hubo un problema con la solicitud' });  // Retorna un objeto de error customizado
        })
      );
  }
}
