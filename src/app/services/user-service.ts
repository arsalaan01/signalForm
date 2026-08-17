// user.service.ts
import { Injectable, inject } from '@angular/core';
import { APP_CONFIG, API_URL, APP_LOGGER } from './app.tokens';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private config = inject(APP_CONFIG);

  private apiUrl = inject(API_URL);

  private logger = inject(APP_LOGGER);

  getUsersUrl() {
    return `${this.config.apiUrl}/users`;
  }

  getAppInfo() {
    return `${this.config.appName} - retries: ${this.config.retryCount}`;
  }

  getUsers() {
    this.logger.log(
      `Getting users from ${this.apiUrl}`
    );
  }
}