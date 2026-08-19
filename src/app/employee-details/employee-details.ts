import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  imports: [],
  templateUrl: './employee-details.html',
  styleUrl: './employee-details.css',
})
export class EmployeeDetails {

  private route = inject(ActivatedRoute);
  ngOnInit() {

    this.route.paramMap.subscribe(params => {

      const employeeId = params.get('id');

      console.log('Employee ID:', employeeId);
    });

    this.route.queryParamMap.subscribe(params => {

      const tab = params.get('tab');
      const year = params.get('year');

      console.log('Tab:', tab);
      console.log('Year:', year);
    });

  }

}
