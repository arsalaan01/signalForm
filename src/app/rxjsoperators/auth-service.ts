import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  getAccessToken(): string | null {
    return localStorage.getItem(
      'access_token'
    );
  }
}