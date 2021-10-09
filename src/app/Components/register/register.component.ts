import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestaurantDTO } from 'src/app/Models/AngularModel/restaurant.dto';
import { RestaurantService } from 'src/app/Services/restaurant.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerRestaurant: RestaurantDTO;

  name: FormControl;
  username: FormControl;
  password: FormControl;
  email: FormControl;

  registerForm: FormGroup;
  isValidForm: boolean | null;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private restaurantService: RestaurantService

  ) {
    this.registerRestaurant = new RestaurantDTO("", "", "", "");
    this.isValidForm = null;

    this.name = new FormControl(this.registerRestaurant.name, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]);
    this.username = new FormControl(this.registerRestaurant.username, [Validators.required, Validators.minLength(5), Validators.maxLength(30)]);
    this.password = new FormControl(this.registerRestaurant.password, [Validators.required, Validators.minLength(8), Validators.maxLength(25)]);
    this.email = new FormControl(this.registerRestaurant.email, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]);

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
      return;
    }
    this.isValidForm = true;
    this.registerRestaurant = this.registerForm.value;
    try {
      await this.restaurantService.register(this.registerRestaurant);
      responseOK = true;

    } catch (error: any) {
      responseOK = false;
      errorResponse = error.error;
    }

    if (responseOK) {
      this.restaurantService.reset()
      this.router.navigateByUrl("/");
    }


  }

}
