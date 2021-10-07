import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDTO } from '../Models/AngularModel/user.dto';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TestService {

  private urlGastrolinkApi: string;
  private controller: string;

  constructor(private http: HttpClient) {
    this.controller = "test";
    this.urlGastrolinkApi = "/api/" + this.controller;
  }
  getTest(): Promise<UserDTO> {
    return this.http.get<UserDTO>(this.urlGastrolinkApi).toPromise();
  }
}
