import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserLogin } from './userlogin/user-login/user-login';
import { RegisterUser} from './register-user/register-user';
import { ProfileForm } from './profile-form/profile-form';
import { UserService } from './services/user-service';
import { UsersComponent } from "./users/users";
import { UserInfo } from './rxjsoperators/user-info/user-info';

@Component({
  selector: 'app-root',
  imports: [UserLogin, RegisterUser, ProfileForm, UsersComponent,UserInfo],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // private userService = inject(UserService);
  // appInfo = this.userService.getAppInfo();
  // usersUrl = this.userService.getUsersUrl();
 
}
