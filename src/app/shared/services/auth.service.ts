import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ILogin } from '../interfaces/loginI';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(
  private httpClient: HttpClient
) { }

  signIn(body:ILogin){
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    const url = environment.serverUrl + '/auth';
    return this.httpClient.post(url, body, { headers:headers });
  }

}
