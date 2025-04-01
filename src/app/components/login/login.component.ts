import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from "../../service/authentication.service";
import {Auth, User, user} from "@angular/fire/auth";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {data} from "autoprefixer";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy, OnInit {
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  userSubscription: Subscription;
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;


  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      console.log('User Subscription', aUser);
    })
  }

  ngOnInit() {
    const data = { name: 'John Doe', age: 30 };
    this.addData('users', data);
    this.getData('users');
  }

  onLogin(email: string, password: string) {
    this.authenticationService.signIn(email, password).then(data => {
      console.log(data)
      if (!data.error) {
        this.router.navigate(['/spare'])
      } else {
        this.router.navigate(['/login'])
      }
    })
  }

  onLoginWithGoogle() {
    this.authenticationService.signInWithGoogle().then(data => {
      console.log("Data: ", data)
    })
  }

  onLoginWithFacebook() {
    this.authenticationService.signInWithFacebook().then(data => {
      console.log("Data: ", data)
    })
  }

  getData(collectionName: string) {
    const data = this.authenticationService.getData(collectionName).subscribe(data => console.log(data));

    console.log('Les donnees: ', data);
  }

  addData(collectionName: string, data: any) {
    this.authenticationService.addData(collectionName, data);
    console.log('Data added successfully!');
  }

  onSubmit() {
    console.log('Email:', this.email, 'Password:', this.password, 'Remember Me:', this.rememberMe);

    this.onLogin(this.email, this.password);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
