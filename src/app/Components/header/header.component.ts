import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/Services/user.service.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  HEY: string = "Hello";
  heyName: any = {};

  constructor(
    private testService: TestService,
  ) {
    this.test();
    this.loadTest()
  }

  ngOnInit(): void {

  }

  test() {
    this.HEY = "HEY";
  }

  private async loadTest(): Promise<void> {
    let errorResponse: any;
    try {
      this.heyName = await this.testService.getTest();
      this.HEY = this.heyName[0].name;
    } catch (error: any) {
      errorResponse = error.error;
      console.log(errorResponse);
    }
  }

}
