import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { UserService } from 'src/app/Services/user.service';

// import { TestService } from 'src/app/Services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {

  currentUser: string = "Hello Stranger";


  // UserLogged: any = "Hello stranger";
  // heyName: any = {};

  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService
    // private testService: TestService,
  ) {

    this.loadUser()
    // this.test();
    // this.loadTest()
  }

  ngOnInit(): void {

  }
  ngOnChanges() {

  }

  private async loadUser() {
    if (this.localStorageService.get("loggedIn")) {
      const loggedUser = await this.userService.get();
      if (loggedUser.loggedIn) {
        this.currentUser = "Hello " + loggedUser.username;
      } else {
        this.localStorageService.remove("loggedIn");
      }
    }
    try {


    } catch (error: any) {
      console.log(error)
    }

  }

  test() {


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
