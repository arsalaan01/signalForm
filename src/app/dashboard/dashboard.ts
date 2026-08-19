import { Component } from '@angular/core';
import { CreateEmployee } from '../create-employee/create-employee';

@Component({
  selector: 'app-dashboard',
  imports: [CreateEmployee],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

}
