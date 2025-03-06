import { Component } from '@angular/core';
import {AuthenticationService} from "../../service/authentication.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  email: string = '';

  constructor(private authenticationService: AuthenticationService) {
  }

  onSubmit() {
    const response = this.authenticationService.forgotPassword(this.email);

    console.log(response);
  }
}
