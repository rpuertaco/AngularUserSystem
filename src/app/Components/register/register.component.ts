import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDTO } from 'src/app/Models/AngularModel/user.dto';
import { HeaderMenuService } from 'src/app/Services/header-menu.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { SharedService } from 'src/app/Services/shared-service.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUser: UserDTO;

  name: FormControl;
  username: FormControl;
  password: FormControl;
  email: FormControl;

  registerForm: FormGroup;
  isValidForm: boolean | null;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private sharedService: SharedService,
    private localStorateService: LocalStorageService,
    private headerMenuService: HeaderMenuService

  ) {
    this.registerUser = new UserDTO("", "", "", "");
    this.isValidForm = null;

    this.name = new FormControl(this.registerUser.name, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]);
    this.username = new FormControl(this.registerUser.username, [Validators.required, Validators.minLength(5), Validators.maxLength(30)]);
    this.password = new FormControl(this.registerUser.password, [Validators.required, Validators.minLength(8), Validators.maxLength(25)]);

    this.email = new FormControl(this.registerUser.email, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]);

    this.registerForm = this.formBuilder.group({
      name: this.name,
      username: this.username,
      password: this.password,
      email: this.email
    });
  }

  ngOnInit(): void {
  }

  async register(): Promise<void> {
    let responseOK: boolean = false;
    this.isValidForm = false;
    let errorResponse: any;
    if (this.registerForm.invalid) {
      console.log("invalid Form")

      return;
    }
    this.isValidForm = true;
    this.registerUser = this.registerForm.value;


    try {
      // try create user
      const registeredUser = await this.userService.register(this.registerUser);
      // if user update name
      this.userService.updateUsername(registeredUser.name);
      responseOK = true;
      // set localstorage
      this.localStorateService.set("loggedIn", true);
      this.headerMenuService.logInService(true);



    } catch (error: any) {
      responseOK = false;
      errorResponse = error.error;
      console.log(error.error);
      // update shared service
      this.sharedService.errorLog(errorResponse);
    }

    await this.sharedService.managementToast(
      'registerFeedback',
      responseOK,
      errorResponse
    );

    console.log("passed");

    if (responseOK) {
      this.router.navigateByUrl("/");
    }


  }

}
