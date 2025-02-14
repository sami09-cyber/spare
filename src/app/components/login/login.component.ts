import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from "../../service/authentication.service";
import {Auth, User, user} from "@angular/fire/auth";
import {Subscription} from "rxjs";

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


  constructor(private authenticationService: AuthenticationService) {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      console.log(aUser);
    })
  }

  ngOnInit() {
    const data = { name: 'John Doe', age: 30 };
    this.addData('users', data);
    this.getData('users');
  }

  onLogin(email: string, password: string) {
    const user = this.authenticationService.signIn(email, password);
    console.log(user);
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
