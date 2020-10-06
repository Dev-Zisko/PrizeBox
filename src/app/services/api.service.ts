import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from './env.service';

export interface User {
  nickname: string,
  name: string,
  lastname: string,
  cellphone: string,
  country: string,
  orb: string,
  orbs: string,
  email: string,
  password: string,
  repeatpassword: string
}; // Object User

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  CODE_PASS = '********';

  constructor(private http: HttpClient, private env: EnvService) { }

  //API REGISTER-LOGIN-SEARCHUSER-PROFILE

  register(nickname, name, lastname, cellphone, country, email, password) {
    try {
      return this.http.post(this.env.API_URL + 'apiregister',
        { nickname: nickname, name: name, lastname: lastname, cellphone: cellphone, country: country, 
          email: email, password: password, ticket: this.CODE_PASS }
      );
    } catch (error) {
      alert("Operation failed. It may be due to connection problems, try later");
    }
  }

  login(nickname, password) {
    try {
      return this.http.post(this.env.API_URL + 'apilogin',
        { nickname: nickname, password: password, ticket: this.CODE_PASS }
      );
    } catch (error) {
      alert("Operation failed. It may be due to connection problems, try later");
    } 
  }

  searchUser(nickname){
    try {
      return this.http.post(this.env.API_URL + 'apisearch',
        { nickname: nickname, ticket: this.CODE_PASS }
      );
    } catch (error) {
      alert("Error en la operación. Puede ser por problemas de conexión, intente más tarde.");
    }
  }

  editProfile(email, name, lastname, cellphone, password) {
    try {
      return this.http.post(this.env.API_URL + 'apiprofile',
        { email: email, name: name, lastname: lastname, cellphone: cellphone, 
          password: password, ticket: this.CODE_PASS }
      );
    } catch (error) {
      alert("Error en la operación. Puede ser por problemas de conexión, intente más tarde.");
    }
  }

  purchaseOrbs(nickname){
    try {
      return this.http.post(this.env.API_URL + 'apiorbs',
        { nickname: nickname, ticket: this.CODE_PASS }
      );
    } catch (error) {
      alert("Error en la operación. Puede ser por problemas de conexión, intente más tarde.");
    }
  }

  participateRaffle(nickname){
    try {
      return this.http.post(this.env.API_URL + 'apiraffle',
        { nickname: nickname, ticket: this.CODE_PASS }
      );
    } catch (error) {
      alert("Error en la operación. Puede ser por problemas de conexión, intente más tarde.");
    }
  }

}
