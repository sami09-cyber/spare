import {Component, inject, OnDestroy} from '@angular/core';
import {AuthenticationService} from "../../service/authentication.service";
import {Auth, User, user} from "@angular/fire/auth";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  userSubscription: Subscription;
  email: string = '';
  password: string = '';


  constructor(private authenticationService: AuthenticationService) {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      console.log(aUser);
    })
  }


  onLogin() {
    try {
      const user = this.authenticationService.signIn(this.email, this.password);

      console.log(user);

      // Navigate to the desired route after login
    } catch (error) {
      console.error('Login error:', error);
    }
  }


  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
