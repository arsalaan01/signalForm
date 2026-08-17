import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, map, tap, catchError, throwError } from 'rxjs';
import { UserDto } from './user-dto';
import { UserCard } from './user-card';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);

    private readonly url =
        'https://jsonplaceholder.typicode.com/users';

    private readonly postsUrl =
    'https://jsonplaceholder.typicode.com/posts';

  getUsers(): Observable<UserCard[]> {
    return this.http
    .get<UserDto[]>(this.url)
    .pipe(
      tap(users => {
        console.log('Users received from API:', users);
      }),
      map(users =>
        users.map(user => ({
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          city: user.address.city
        }))
      ),

    tap(users => {
        console.log('Transformed response:', users);
    })
    );
  }

  getPostsByUser(userId: number): Observable<Post[]> {
    return this.http.get<Post[]>(
      this.postsUrl,
      {
        params: {
          userId
        }
      }
    );
  }

  searchPosts(title: string): Observable<Post[]> {
    return this.http.get<Post[]>(
        this.postsUrl,
        {
        params: {
            title
        }
        });
    }

    getPost(postId: number): Observable<Post> {
    return this.http.get<Post>(
        `${this.postsUrl}/${postId}`
    );
    }

    updatePost(post: Post): Observable<Post> {
        return this.http.put<Post>(
            `${this.postsUrl}/${post.id}`,
            post
    );
    }

    createPost(post: Omit<Post, 'id'>): Observable<Post> {
        return this.http
        .post<Post>(this.postsUrl, post)
        .pipe(
        catchError((error: HttpErrorResponse) => {

        if (error.status === 404) {
            console.log('Post not found');
        }

        if (error.status === 401) {
            console.log('Authentication required');
        }

        if (error.status >= 500) {
            console.log('Server problem');
        }

        return throwError(() => error);
        })
    );
    }

    getTodosByUser(userId: number): Observable<Todo[]> {
    return this.http.get<Todo[]>(
        'https://jsonplaceholder.typicode.com/todos',
        {
        params: {
            userId
        }
        }
    );
    }

    getUser(userId: number): Observable<UserDto> {
    return this.http.get<UserDto>(
        `${this.url}/${userId}`
    );
}
}