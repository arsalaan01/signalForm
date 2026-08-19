import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Projects } from './projects/projects';
import { Employees } from './employees/employees';
import { CreateEmployee } from './create-employee/create-employee';
import { EmployeeDetails } from './employee-details/employee-details';
import { PageNotFound } from './page-not-found/page-not-found';

export const routes: Routes = [
  {
    path: '',
    component: Dashboard
  },
  {
    path: 'projects',
    component: Projects
  },
  {
  path: 'employees',
  loadComponent: () =>
    import('./employees/employees')
      .then(m => m.Employees)
      },
  {
    path: 'employees/create',
    component: CreateEmployee
  },
  {
    path: 'employees/:id',
    component: EmployeeDetails
  },
  {
    path: '**',
    component: PageNotFound
  }
];