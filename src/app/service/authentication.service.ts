import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  signOut
} from "@angular/fire/auth";
import {addDoc, collection, collectionData, doc, Firestore, setDoc} from "@angular/fire/firestore";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private auth: Auth, private firestore: Firestore, private router: Router) {}
  signUp(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password).then((userCredential) => {
      const user = userCredential.user;

      console.log(user);

      return user
    }).catch((error) => {
      console.log('Signup error:',error);
    });
  }

  signIn(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password).then((userCredential) => {
      const user = userCredential.user;

      console.log(user);

      return user
    }).catch((error) => {
      console.log('Login error:',error);
    });
  }

  sendEmail(email: string) {
    const actionCodeSettings = {
      url: 'https://www.example.com/?email=' + email,
      iOS: {
        bundleId: 'com.example.ios'
      },
      android: {
        packageName: 'com.example.android',
      },
      handleCodeInApp: true,
      // Specify a custom Hosting link domain to use. The domain must be
      // configured in Firebase Hosting and owned by the project.
      linkDomain: "custom-domain.com"
    };

    sendSignInLinkToEmail(this.auth, email, actionCodeSettings).then(() => {
      window.localStorage.setItem('emailForSignIn', email);
    }).catch((error) => {
      console.log('Send SignIn Link To Email error:', error);
    });
  }

  signOut() {
    signOut(this.auth).then(() => {
      console.log('Sign Out');
      this.router.navigate(['/login']);
    }).catch((error) => {
      console.log('Logout error:', error);
    });
  }

  getCurrentUser() {
    return authState(this.auth);
  }

  addData(collectionName: string, data: any) {
    const collectionRef = collection(this.firestore, collectionName);
    return addDoc(collectionRef, data);
  }

  setData(collectionName: string, documentId: string, data: any) {
    const docRef = doc(this.firestore, collectionName, documentId);
    return setDoc(docRef, data);
  }


  getData(collectionName: string): Observable<any[]> {
    const collectionRef = collection(this.firestore, collectionName);
    return collectionData(collectionRef, { idField: 'id' });
  }
}
