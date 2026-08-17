// app.tokens.ts
import { InjectionToken } from '@angular/core';
import { AppConfig } from './app-config.model';
import { LoggerService } from './logger-service';

export const APP_CONFIG =
  new InjectionToken<AppConfig>('APP_CONFIG');

export const API_URL =
  new InjectionToken<string>('API_URL');

export const APP_NAME =
  new InjectionToken<string>('APP_NAME');

export const APP_LOGGER =
  new InjectionToken<LoggerService>('APP_LOGGER');