import {Component, inject, OnDestroy} from '@angular/core';
import {Auth, createUserWithEmailAndPassword, sendSignInLinkToEmail, User, user} from "@angular/fire/auth";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnDestroy {
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  userSubscription: Subscription;


  constructor() {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      console.log(aUser);
    })
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  //
  // createUser() {
  //   const actionCodeSettings = {
  //     url: 'https://www.example.com/?email=' + email,
  //     iOS: {
  //       bundleId: 'com.example.ios'
  //     },
  //     android: {
  //       packageName: 'com.example.android',
  //     },
  //     handleCodeInApp: true,
  //     // Specify a custom Hosting link domain to use. The domain must be
  //     // configured in Firebase Hosting and owned by the project.
  //     linkDomain: "custom-domain.com"
  //   };
  //
  //
  //   createUserWithEmailAndPassword(this.auth, email, password).then((userCredential) => {
  //     const user = userCredential.user;
  //   }).catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //   });
  //
  //   sendSignInLinkToEmail(auth, email, actionCodeSettings).then(() => {
  //       // The link was successfully sent. Inform the user.
  //       // Save the email locally so you don't need to ask the user for it again
  //       // if they open the link on the same device.
  //       window.localStorage.setItem('emailForSignIn', email);
  //       // ...
  //     }).catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // ...
  //     });
  // }
  //

}
