import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthDTO } from 'src/app/Models/AngularModel/auth.dto';
import { AuthService } from 'src/app/Services/auth.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { SharedService } from 'src/app/Services/shared-service.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // @Output() changeUser = new EventEmitter();
  // @Output("activate") activate = new EventEmitter();



  loginUser: AuthDTO;
  username: FormControl;
  password: FormControl;
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private sharedService: SharedService,
    private userService: UserService,
    private localStorateService: LocalStorageService,
    private router: Router

  ) {

    this.loginUser = new AuthDTO("", "", "", "");
    this.username = new FormControl(this.loginUser.username, [Validators.required]);
    this.password = new FormControl(this.loginUser.password, [Validators.required]);

    this.loginForm = this.formBuilder.group({
      username: this.username,
      password: this.password
    });
  }

  ngOnInit(): void {
  }

  // change() {
  //   console.log("clicked");
  //   this.changeUser.emit("dato Emitido");
  // }
  // changeAdded() {
  //   console.log("clicked");
  //   this.activate.emit("dato Emitido Activate");
  // }

  async login(): Promise<void> {

    let responseOK: boolean = false;
    let errorResponse: any;
    this.loginUser.username = this.username.value;
    this.loginUser.password = this.password.value;
    try {
      const loggedUser = await this.authService.login(this.loginUser);
      this.userService.updateUsername(loggedUser.username);
      // this.changeUser.emit(this.loginUser);
      responseOK = true;
      this.localStorateService.set("loggedIn", loggedUser.loggedIn);

    } catch (error: any) {
      responseOK = false;
      errorResponse = error;
      this.sharedService.errorLog(error);
    }

    await this.sharedService.managementToast(
      'loginFeedback',
      responseOK,
      errorResponse
    );

    if (responseOK) {
      this.router.navigateByUrl('/');

    }
  }

}
