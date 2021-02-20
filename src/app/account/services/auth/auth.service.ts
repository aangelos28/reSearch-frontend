import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import auth = firebase.auth;
import User = firebase.User;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public firebaseAuth: AngularFireAuth) {
  }

  public loginFirebaseEmailPassword(email: string, password: string): Promise<any> {
    return this.firebaseAuth.signInWithEmailAndPassword(email, password);
  }

  public loginFirebaseGoogle(): Promise<any> {
    return this.firebaseAuth.signInWithRedirect(new auth.GoogleAuthProvider());
  }

  public logoutFirebase(): Promise<any> {
    return this.firebaseAuth.signOut();
  }

  public createAccount(email: string, password: string): Promise<any> {
    return this.firebaseAuth.createUserWithEmailAndPassword(email, password);
  }

  public reauthEmailPassword(user: User, password: string): Promise<auth.UserCredential> {
    const credential = auth.EmailAuthProvider.credential(user.email, password);
    return user.reauthenticateWithCredential(credential);
  }

  public reauthGoogle(user: User): Promise<void> {
    return user.reauthenticateWithRedirect(new auth.GoogleAuthProvider());
  }
}
