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
  rememberMe: boolean = false;


  constructor(private authenticationService: AuthenticationService) {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      console.log(aUser);
    })
  }


  onLogin(email: string, password: string) {
    const user = this.authenticationService.signIn(email, password);
    console.log(user);


    // try {
    //   const user = this.authenticationService.signIn(email, password);
    //
    //   console.log(user);
    //
    //   // Navigate to the desired route after login
    // } catch (error) {
    //   console.error('Login error:', error);
    // }
  }

  onSubmit() {
    console.log('Email:', this.email, 'Password:', this.password, 'Remember Me:', this.rememberMe);

    this.onLogin(this.email, this.password);
  }


  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
