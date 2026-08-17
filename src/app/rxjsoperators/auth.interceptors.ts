import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn =
  (req, next) => {

    const modifiedRequest = req.clone({
      setHeaders: {
        'X-Application-Name':
          'Angular-RxJS-Demo'
      }
    });

    return next(modifiedRequest);
  };