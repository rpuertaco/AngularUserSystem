import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDTO } from '../Models/AngularModel/user.dto';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private urlGastrolinkApi: string;
  private controller: string;


  constructor(private http: HttpClient) {
    this.controller = "register";
    this.urlGastrolinkApi = "/api/" + this.controller;
  }

  register(registerMe: UserDTO): Promise<UserDTO> {

    return this.http.post<UserDTO>(this.urlGastrolinkApi, registerMe).toPromise();

  };

  get(): Promise<any> {
    return this.http.get<any>("/api/currentUser").toPromise()
  }

  updateUsername(username: string): void {
    const currentUser = document.getElementById("currentUser");
    if (currentUser) {
      currentUser.textContent = "Hello " + username;
    }

  }
}