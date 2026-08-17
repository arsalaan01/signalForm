import { Component, inject } from '@angular/core';
import { ApiService } from '../api-service';
import { AsyncPipe } from '@angular/common';
import { 
   switchMap,
   filter,
   debounceTime,
   distinctUntilChanged, 
   tap, mergeMap, 
   concatMap, 
   from, 
   toArray, 
   Subject, 
   exhaustMap, 
   catchError, 
   of,
   throwError, 
   retry,
   forkJoin,
   combineLatest,
   startWith
  } from 'rxjs';
import { FormControl,ReactiveFormsModule } from '@angular/forms';
import { Post } from '../api-service';
import { count } from 'console';

@Component({
  selector: 'app-user-info',
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './user-info.html',
  styleUrl: './user-info.css',
})
export class UserInfo {
  private userService = inject(ApiService);

  postIds = [1, 2, 3];

  postsToUpdate: Post[] = [
  {
    id: 1,
    userId: 1,
    title: 'Version 1',
    body: 'First update'
  },
  {
    id: 2,
    userId: 1,
    title: 'Version 2',
    body: 'Second update'
  },
  {
    id: 3,
    userId: 1,
    title: 'Version 3',
    body: 'Third update'
  }
];

  saveClick$ = new Subject<void>();

  users$ = this.userService.getUsers();

  selectedUserId = new FormControl<number | null>(null);

  searchControl = new FormControl('', {
    nonNullable: true
  });

  filterControl = new FormControl('all', {
      nonNullable: true
  });

  ngOnInit() {
    // testExhaustMap();
  }

  posts$ = this.selectedUserId.valueChanges.pipe(
    filter((userId): userId is number => userId !== null),
    switchMap(userId =>
      this.userService.getPostsByUser(userId!)
    )
  );

  searchResults$ = this.searchControl.valueChanges.pipe(
    tap(value =>
        console.log('1. valueChanges:', value)
      ),

      debounceTime(500),

      tap(value =>
        console.log('2. after debounce:', value)
      ),

      distinctUntilChanged(),

      tap(value =>
        console.log('3. making API request:', value)
      ),

      switchMap(title =>
        this.userService.searchPosts(title)
      ),

      tap(posts =>
        console.log('4. API response:', posts)
      )
  );

  postsUsingSwitchMap$ = from(this.postIds).pipe(
    tap(id =>
      console.log('Post ID:', id)
    ),
    mergeMap(id =>
      this.userService.getPost(id)
    ),
    toArray()
  );

  saveSequentially() {
  from(this.postsToUpdate)
    .pipe(
      concatMap(post => {
        console.log('Starting:', post.id);

        return this.userService
          .updatePost(post)
          .pipe(
            tap(() => {
              console.log('Finished:', post.id);
            })
          );
      }),

      toArray()
    )
    .subscribe(posts => {
      console.log('ALL FINISHED:', posts);
    });
  }

  testExhaustMap() {
    this.saveClick$
    .pipe(
      exhaustMap(() => {
        console.log('Starting request');

        return this.userService.createPost({
          userId: 1,
          title: 'New Post',
          body: 'Created from exhaustMap'
        }).pipe(
          tap(() => {
            console.log('Request finished');
          })
        );
      })
    )
    .subscribe(response => {
      console.log('Created:', response);
    });
  }

  loadPost() {
  this.userService
    .getPost(999999)
    .pipe(
      retry({
        count:2,
        delay: 1000
      }),
      catchError(error => {
        console.log('Something went wrong:', error);
        return of(null);
      })
    )
    .subscribe(post => {
      console.log('Result:', post);
    });
}

loadDashboard() {
  forkJoin({
    user: this.userService.getUser(1),
    posts: this.userService.getPostsByUser(1),
    todos: this.userService.getTodosByUser(1)
  }).subscribe(result => {
    console.log('User:', result.user);
    console.log('Posts:', result.posts);
    console.log('Todos:', result.todos);
  });
}

  filteredUsers$ = combineLatest({
  users: this.users$,
  filter: this.filterControl.valueChanges.pipe(
    startWith(this.filterControl.value)
  )
  }).subscribe(result => {
    console.log(result);
    console.log(result.users);
    console.log(result.filter);
});
  
}
