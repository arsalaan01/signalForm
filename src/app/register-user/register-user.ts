import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  AsyncValidatorFn,
  Validators
} from '@angular/forms';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-register-user',
  imports: [ReactiveFormsModule],
  templateUrl: './register-user.html',
  styleUrl: './register-user.css',
})
export class RegisterUser {


  registerForm!: FormGroup;

  ngOnInit() {
    this.registerForm = new FormGroup({
      firstName: new FormControl('',[Validators.required,Validators.minLength(2),Validators.maxLength(20),Validators.pattern(/^[a-zA-Z]+$/)]),
      lastName: new FormControl('',[Validators.required,Validators.minLength(2),Validators.maxLength(20),Validators.pattern(/^[a-zA-Z]+$/)]),
      email: new FormControl('',[Validators.required,Validators.email],[this.emailExistsValidator]),
      contact: new FormControl('',[Validators.pattern(/^[0-9]{10}$/)]),
      dateOfBirth: new FormControl('',[Validators.required]),
      gender: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required, Validators.minLength(8),Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/)]),
      confirmPassword: new FormControl('',[Validators.required]),
      accountType: new FormControl('',[Validators.required]),
      productUpdates: new FormControl(false),
      termsAndCon: new FormControl(false,[Validators.required])
    },{validators: this.passwordMatchValidator});

    this.registerForm.get('accountType')?.valueChanges.subscribe(value => {
      const contact = this.registerForm.get('contact');
      if (value === 'business') {
        contact?.addValidators(Validators.required);
      } else {
        contact?.removeValidators(Validators.required);
      }
      contact?.updateValueAndValidity();
    });
  }

  onSubmit(){
    console.log(this.registerForm);
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
    } else {
      this.registerForm.markAllAsTouched();
    }
    
  }

  passwordMatchValidator:ValidatorFn = (control:AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword ? null : {passwordMismatch:true};
  }

  emailExistsValidator: AsyncValidatorFn = (control: AbstractControl) => {
    const existingEmails = [
      'john@gmail.com',
      'admin@gmail.com'
    ];

    const emailExists =
      existingEmails.includes(control.value);

    return of(
      emailExists
        ? { emailExists: true }
        : null
    ).pipe(
      delay(1000)
    );
  };

}
