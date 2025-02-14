import {Component, inject} from '@angular/core';
import {AuthenticationService} from "../../service/authentication.service";
import {Auth, user} from "@angular/fire/auth";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  formData = {
    lastName: '',
    firstName: '',
    email: '',
    password: '',
  };


  constructor(private authenticationService: AuthenticationService) {}

  onSignup(email: string, password: string) {
    const user = this.authenticationService.signUp(email, password);
    console.error(user);
  }

  onSubmit() {
    console.log('Form Data:', this.formData);

    this.onSignup(this.formData.email, this.formData.password);
  }
}
