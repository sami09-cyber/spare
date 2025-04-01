import { Component } from '@angular/core';
import {AuthenticationService} from "../../service/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  email: string = '';

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  onSubmit() {
    const response = this.authenticationService.forgotPassword(this.email);

    console.log(response);

    this.router.navigate(['/home'])
  }
}
