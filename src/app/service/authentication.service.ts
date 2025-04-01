import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {
  Auth,
  authState, confirmPasswordReset,
  createUserWithEmailAndPassword,
  FacebookAuthProvider, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut, updateProfile, User
} from "@angular/fire/auth";
import {addDoc, collection, collectionData, deleteDoc, doc, Firestore, getDoc, setDoc} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {AuthenticationResponse} from "../models/models";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  constructor(private auth: Auth, private firestore: Firestore, private router: Router) {}


  signUp(lastName: string, firstName: string, email: string, password: string): Promise<AuthenticationResponse<User>>{
    return createUserWithEmailAndPassword(this.auth, email, password).then((userCredential) => {
      const user = userCredential.user;
      console.log('User create: ', user);

      return updateProfile(user, { displayName: `${firstName} ${lastName}` }).then(() => sendEmailVerification(user)).then(() => ({
        error: false, value: user
      })).catch(error => ({
        error: true, value: error.message
      }));
    }).catch(error => ({
      error: true, value: error.message
    }));
  }

  signIn(email: string, password: string): Promise<AuthenticationResponse<User>>{
    return signInWithEmailAndPassword(this.auth, email, password).then(userCredential => ({
      error: false,
      value: userCredential.user
    })).catch(error => ({
      error: true,
      value: error.message
    }));
  }

  signInWithGoogle(): Promise<AuthenticationResponse<any>> {
    const provider = new GoogleAuthProvider();

    return signInWithPopup(this.auth, provider).then(result => ({
        error: false,
        value: {
          token: GoogleAuthProvider.credentialFromResult(result)?.accessToken,
          user: result.user
        }
      })).catch(error => ({
        error: true,
        value: {
          errorCode: error.code,
          errorMessage: error.message,
          email: error.customData?.email,
          credential: GoogleAuthProvider.credentialFromError(error)
        }
      })
    );
  }

  signInWithFacebook(): Promise<AuthenticationResponse<any>> {
    const provider = new FacebookAuthProvider();
    provider.addScope('email');
    provider.setCustomParameters({
      display: 'popup'
    });

    return signInWithPopup(this.auth, provider).then(result => ({
      error: false,
      value: {
        token: FacebookAuthProvider.credentialFromResult(result)?.accessToken,
        user: result.user
      }
    })).catch(error => ({
        error: true,
        value: {
          errorCode: error.code,
          errorMessage: error.message,
          email: error.customData?.email,
          credential: FacebookAuthProvider.credentialFromError(error)
        }
      })
    );
  }

  forgotPassword(email: string): Promise<AuthenticationResponse<void>>{
    return sendPasswordResetEmail(this.auth, email).then(() => ({
      error: false,
      value: 'Reset email sended'
    })).catch(error => ({
      error: true,
      value: error.message
    }));
  }

  confirmPasswordReset(email: string, confirmationCode: string, newPassword: string): Promise<AuthenticationResponse<void>> {
     return confirmPasswordReset(this.auth, confirmationCode, newPassword).then(() => ({
       error: false,
       value: 'Confirm password reset sended'
     })).catch(error => ({
       error: true,
       value: error.message
     }));
  }

  signOut(): Promise<AuthenticationResponse<void>> {
    return signOut(this.auth).then(() => {
      this.router.navigate(['/login']);

      return { error: false, value: 'Sign Out successfull' };
    }).catch(error => ({
      error: true,
      value: error.message
    }));
  }

  getCurrentUser(){
    return authState(this.auth);
  }

  addData(collectionName: string, data: any): Promise<AuthenticationResponse<string>>{
    const collectionRef = collection(this.firestore, collectionName);

    return addDoc(collectionRef, data).then(docRef => ({
      error: false,
      value: docRef.id
    })).catch(error => ({
      error: true,
      value: error.message
    }));
  }

  setData(collectionName: string, documentId: string, data: any): Promise<AuthenticationResponse<void>>{
    const documentRef = doc(this.firestore, collectionName, documentId);

    return setDoc(documentRef, data).then(() => ({
      error: false,
      value: 'Set data successfull'
    })).catch(error => ({
      error: true,
      value: error.message
    }));
  }

  getData(collectionName: string): Observable<any[]> {
    const collectionRef = collection(this.firestore, collectionName);

    return collectionData(collectionRef, { idField: 'id' });
  }

  getDataById(collectionName: string, documentId: string): Promise<AuthenticationResponse<any>> {
    const documentRef = doc(this.firestore, collectionName, documentId);

    return getDoc(documentRef).then(docSnap => {
      if (docSnap.exists()) {
        return { error: false, value: docSnap.data() };
      } else {
        return { error: true, value: 'Document not found' };
      }
    }).catch(error => ({
        error: true,
        value: error.message
    }));
  }

  deleteData(collectionName: string, id: string): Promise<AuthenticationResponse<string>> {
    const documentRef = doc(this.firestore, collectionName, id);

    return deleteDoc(documentRef).then(() => ({
        error: false,
        value: `Document ${id} supprime avec succes`
      })).catch(error => ({
        error: true,
        value: error.message
      }));
  }
}
