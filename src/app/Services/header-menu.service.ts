import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderMenuService {

  private _logMeSource = new Subject<boolean>();
  _logMe$ = this._logMeSource.asObservable();

  constructor() { }


  logInService(status: boolean) {
    this._logMeSource.next(status);
  }
}


