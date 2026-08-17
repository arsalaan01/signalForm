import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  inject
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { APP_CONFIG, APP_NAME, API_URL, APP_LOGGER } from './services/app.tokens';

import { routes } from './app.routes';
import { LoggerService } from './services/logger-service';
import { loggingInterceptor } from './rxjsoperators/logging.interceptor';
import { authInterceptor } from './rxjsoperators/auth.interceptors';
import { errorInterceptor } from './rxjsoperators/error.interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(),withInterceptors([
      authInterceptor,
      loggingInterceptor,
      errorInterceptor
    ])),
    {
      provide: APP_CONFIG,
      useValue: {
        apiUrl: 'https://api.example.com',
        appName: 'My Angular App',
        retryCount: 3
      }
    },
    // useValue
    {
      provide: APP_NAME,
      useValue: 'Customer Portal'
    },

    // useFactory
    {
      provide: API_URL,
      useFactory: () => {
        const appName = inject(APP_NAME);

        console.log(`Configuring ${appName}`);

        return 'https://api.example.com';
      }
    },

    // useExisting
    {
      provide: APP_LOGGER,
      useExisting: LoggerService
    }
  ]
}