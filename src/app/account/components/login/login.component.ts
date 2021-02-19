import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.touched && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.touched && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public registerForm: FormGroup;
  public errorMatcher: CustomErrorStateMatcher;

  static passwordConfirmValidation(fg: FormGroup): ValidationErrors | null {
    const password = fg.get('password').value;
    const confirmPassword = fg.get('confirmPassword').value;
    return (password !== null && confirmPassword !== null && password === confirmPassword) ? null : {passwordMismatch: true};
  }

  constructor() { }

  ngOnInit(): void {
    this.errorMatcher = new CustomErrorStateMatcher();

    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ])
    });

    this.registerForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      confirmPassword: new FormControl('')
    }, {validators: LoginComponent.passwordConfirmValidation});
  }

  get emailLogin(): AbstractControl {
    return this.loginForm.get('email');
  }

  get passwordLogin(): AbstractControl {
    return this.loginForm.get('password');
  }

  get emailSignup(): AbstractControl {
    return this.registerForm.get('email');
  }

  get passwordSignup(): AbstractControl {
    return this.registerForm.get('password');
  }

  get confirmPasswordSignup(): AbstractControl {
    return this.registerForm.get('confirmPassword');
  }

  public loginEmailPassword(): void {

  }

  public register(): void {

  }
}
