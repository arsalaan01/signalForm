import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn =
  (req, next) => {

    console.log(
      'REQUEST:',
      req.method,
      req.url
    );

    return next(req).pipe(
      tap({
        next: event => {
          console.log(
            'HTTP EVENT:',
            event
          );
        }
      })
    );
  };