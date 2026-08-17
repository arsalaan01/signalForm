// users.component.ts

import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CustomUserService } from '../services/users-service';
import { User } from '../models/user.model';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-users',
  standalone: true,
  templateUrl: './users.html'
})
export class UsersComponent implements OnInit {

  private userService = inject(CustomUserService);
  private platformId = inject(PLATFORM_ID);

  users: User[] = [];

   ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.userService.getUsers().subscribe(result => {
        this.users = result;
        console.log(this.users);
      
      });
  
    //  this.userService.getUserById(3)
    // .subscribe({
    //   next: user => {
    //     console.log('User:', user);
    //   },
    //   error: error => {
    //     console.error('Error:', error);
    //   }
    // });
    }

  }

  // loadPosts(id:number){
  //   this.userService.getPostsByUser(1).subscribe({
  //     next: (data) => {
  //       console.log('User details: ', data);
        
  //     },
  //     error: (err)=> {
  //       console.error('An error occured', err);
  //     },
  //     complete: () => {
  //       console.log('Stream completed successfully');
        
  //     }
  //   })
  // }
}