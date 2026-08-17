import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { User } from "../models/user.model";
import { Post } from "../models/post.model";

@Injectable({
    providedIn: 'root'
})
export class CustomUserService {
    private httpClient = inject(HttpClient);

    private apiUrl = "https://jsonplaceholder.typicode.com/users";

    getUsers(): Observable<User[]> {
        return this.httpClient.get<User[]>(this.apiUrl);
    }

    getUserById(id: number): Observable<User> {
        return this.httpClient.get<User>(
            `${this.apiUrl}/${id}`
        );
    }

    getPostsByUser(userId: number): Observable<Post[]> {
        return this.httpClient.get<Post[]>(`${this.apiUrl}?userId=${userId}`);
    }
}