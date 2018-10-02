import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AppserviceService {

  constructor(private http: HttpClient) { }

  signIn_request(payload) {
    return this.http.post<any>('http://localhost:8000/signin', payload)
      .pipe(map((response) => {
        return response;
      }));
  }

  signUp_request(payload) {
    return this.http.post<any>('http://localhost:8000/signup', payload)
      .pipe(map((response) => {
        return response;
      }));
  }
}
