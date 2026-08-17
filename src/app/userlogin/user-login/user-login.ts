import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import {
  Component,
  inject,
  PLATFORM_ID
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-user-login',
  imports: [FormsModule],
  templateUrl: './user-login.html',
  styleUrl: './user-login.css',
})
export class UserLogin {

  submit(loginForm: NgForm){
    console.log("Submitted Form: ", loginForm);
    console.log("Submitted Form: ", loginForm.value);
    const submittedDetails = loginForm.value;

    const jobCategories = [
      submittedDetails.job_it && 'IT',
      submittedDetails.job_marketing && 'MARKETING',
      submittedDetails.job_accounts && 'ACCOUNTS',
      submittedDetails.job_hr && 'HR',
    ].filter(Boolean);

    console.log("Final Form: ", {...submittedDetails,jobCategories})  


  }
 
}