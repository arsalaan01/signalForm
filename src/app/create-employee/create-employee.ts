import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  imports: [],
  templateUrl: './create-employee.html',
  styleUrl: './create-employee.css',
})
export class CreateEmployee {
  private router = inject(Router);

  // let emp = {
  //    id: 123,
  //    name: 'John'
  // };  


  saveEmployee() {
    console.log("Going to employees component");
    // this.router.navigate(['/employees']);
    this.router.navigate([
        '/employees',
         1
    ]);
  }

}
