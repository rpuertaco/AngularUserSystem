import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestaurantDTO } from '../Models/AngularModel/restaurant.dto';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private urlGastrolinkApi: string;
  private controller: string;


  constructor(private http: HttpClient) {
    this.controller = "register";
    this.urlGastrolinkApi = "/api/" + this.controller;
  }

  register(registerMe: RestaurantDTO): Promise<RestaurantDTO> {

    return this.http.post<RestaurantDTO>(this.urlGastrolinkApi, registerMe).toPromise();

  };

  reset() {

  };
}
