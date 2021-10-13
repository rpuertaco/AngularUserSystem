import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthDTO } from 'src/app/Models/AngularModel/auth.dto';
import { AuthService } from 'src/app/Services/auth.service';
import { HeaderMenuService } from 'src/app/Services/header-menu.service';
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
    private headerMenuService: HeaderMenuService,
    private router: Router

  ) {

    this.loginUser = new AuthDTO("", "", "", "");
    this.username = new FormControl(this.loginUser.username, [Validators.required, Validators.minLength(5), Validators.maxLength(30)]);
    this.password = new FormControl(this.loginUser.password, [Validators.required, Validators.minLength(8), Validators.maxLength(25)]);

    this.loginForm = this.formBuilder.group({
      username: this.username,
      password: this.password
    });
  }

  ngOnInit(): void {
  }
  async login(): Promise<void> {

    let responseOK: boolean = false;
    let errorResponse: any;
    this.loginUser.username = this.username.value;
    this.loginUser.password = this.password.value;
    try {
      // Try log in user
      const loggedUser = await this.authService.login(this.loginUser);
      // if user update user name on header
      this.userService.updateUsername(loggedUser.name);
      // this.changeUser.emit(this.loginUser);
      responseOK = true;
      // set localstorage logged in 
      this.localStorateService.set("loggedIn", loggedUser.loggedIn);
      this.headerMenuService.logInService(true);

    } catch (error: any) {


      responseOK = false;
      errorResponse = error;

      // if error show error on header service
      this.sharedService.errorLog(error);
    }

    await this.sharedService.managementToast(
      'loginFeedback',
      responseOK,
      errorResponse
    );

    if (responseOK) {
      // return home 
      this.router.navigateByUrl('/');

    }
  }


}
