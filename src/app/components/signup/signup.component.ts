import {Component, inject} from '@angular/core';
import {AuthenticationService} from "../../service/authentication.service";
import {Auth, user} from "@angular/fire/auth";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  formData = {
    lastName: '',
    firstName: '',
    email: '',
    password: '',
  };

  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  onSignup(lastName: string, firstName: string, email: string, password: string) {
    this.authenticationService.signUp(lastName, firstName, email, password).then(data => {
      console.log(data)
      if (!data.error) {
        this.router.navigate(['/spare'])
      } else {
        this.router.navigate(['/signup'])
      }
    });
  }

  onSubmit() {
    this.onSignup(this.formData.lastName, this.formData.firstName, this.formData.email, this.formData.password);
  }
}
