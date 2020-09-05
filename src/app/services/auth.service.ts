import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
//import { AngularFireAuth, AngularFireDatabase, FirebaseAuthState, AuthProviders, AuthMethods, AngularFire  } from 'angularfire2';

import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';
//import * as firebase from 'firebase/app';
import * as firebase from 'firebase';
//import { Observable } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';


@Injectable()
export class AuthService {


  public user: Observable<firebase.User>;


  constructor(
    public _authFB: AngularFireAuth,
    private _router: Router,
    private _ngZone: NgZone,
    private http: HttpClient
  ) {
    //this.user = _authFB.authState;
    this.user = this._authFB.authState;

  }

  registerWithEmail(auth_details) {

    this._authFB.auth.createUserWithEmailAndPassword(auth_details.email, auth_details.password)
      .then((data) => {

        this._router.navigate(['/login']);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  login(email, password): Observable<any> {
    return Observable.fromPromise(
      this._authFB.auth.signInWithEmailAndPassword(email, password)
    );
  }

  isAuthenticated(): Observable<boolean> {
    return this.user.map(user => user && user.uid !== undefined);
  }

  getAuth() {
    return this._authFB.authState.map((user) => {
      return user.uid;
    });
  }

  logout() {
    this._authFB.auth.signOut()
      .then(() => {
        this._router.navigate(['/ilogin']);
      });
  }

  loginWithGoogle() {
    this._ngZone.runOutsideAngular(() => {
      this._authFB.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then((data) => {
          console.log(data);
          this._router.navigate(['/home']);
        });
    });
  }

}

