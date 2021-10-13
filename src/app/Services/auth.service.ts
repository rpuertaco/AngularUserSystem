import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthDTO } from '../Models/AngularModel/auth.dto';


interface loggedUser {
  // _id: string,
  // username: string,
  name: string,
  loggedIn: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlGastrolinkApi: string;
  private controller: string;


  constructor(
    private http: HttpClient
  ) {
    this.controller = "login";
    this.urlGastrolinkApi = "/api/" + this.controller;

  }

  login(auth: AuthDTO): Promise<loggedUser> {
    return this.http.post<loggedUser>(this.urlGastrolinkApi, auth).toPromise()

  }






}
