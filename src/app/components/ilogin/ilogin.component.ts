import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-ilogin',
  templateUrl: './ilogin.component.html',
  styleUrls: ['./ilogin.component.css']
})
export class IloginComponent implements OnInit {

  public form: FormGroup;
  public user$ = this.authService.user;


  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { 
    this.form = this.formBuilder.group({
      email:['', Validators.required],
      password:['', Validators.required]
    });
  }

  ngOnInit() {
  }

  login(){
    const inputValue = this.form.value;
    //console.log(inputValue.email, inputValue.password);
    this.authService.login(inputValue.email, inputValue.password)
    .subscribe(
      success => this.router.navigate(['/invoices']),
      error => alert(error)
    );
  }

  signUp() {
     const inputValue = this.form.value;
    const credentials = {
      email: inputValue.email,
      password: inputValue.password
    };
    this.authService.registerWithEmail(credentials);
  }

  /* loginWithGoogle(){
    this.authService.loginWithGoogle();
  } */

}
