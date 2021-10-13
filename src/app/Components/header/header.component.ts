import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { UserService } from 'src/app/Services/user.service';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { HeaderMenuService } from 'src/app/Services/header-menu.service';

// import { TestService } from 'src/app/Services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {

  currentUser: string = "";
  // unlock or lock logged options
  isLoggedIn: boolean = false;


  // UserLogged: any = "Hello stranger";
  // heyName: any = {};

  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private headerMenuService: HeaderMenuService,
    private router: Router
    // private testService: TestService,
  ) {

    this.loadUser()
    // this.test();
    // this.loadTest()
  }

  ngOnInit(): void {

    this.headerMenuService._logMe$.subscribe(
      status => {
        this.isLoggedIn = status;
      }
    );
  }
  ngOnChanges() {
    console.log("onchange");
  }

  private async loadUser() {
    // if there is an user try to find user
    if (this.localStorageService.get("loggedIn")) {
      const loggedUser = await this.userService.get();

      // if find user, show options and set user name on header
      if (loggedUser.loggedIn) {
        this.currentUser = loggedUser.name;
        this.isLoggedIn = loggedUser.loggedIn;

        // this.isLogged()

        // if no user, remove localstorage and lock options
      } else {
        this.isLoggedIn = loggedUser.loggedIn;
        this.localStorageService.remove("loggedIn");

        // this.isLogged()
      }
    }

  }

  // isLogged() {
  //   if (this.isLoggedIn) {
  //     this.isLoggedIn = false;

  //   } else {
  //     this.isLoggedIn = true;

  //   }
  // }

  async logOut() {
    // log out
    await this.userService.logOut();
    // hide logged options
    this.isLoggedIn = false;
    // erase user name
    this.userService.updateUsername("");
    // remove local storage 
    this.localStorageService.remove("loggedIn");
    this.router.navigateByUrl('/');

  }


  // private async loadTest(): Promise<void> {
  //   let errorResponse: any;
  //   try {
  //     this.heyName = await this.testService.getTest();
  //     this.HEY = this.heyName[0].name;
  //   } catch (error: any) {
  //     errorResponse = error.error;
  //     console.log(errorResponse);
  //   }
  // }

}
