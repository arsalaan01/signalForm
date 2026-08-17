import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';

export const timingInterceptor: HttpInterceptorFn =
  (req, next) => {

    const start = performance.now();

    return next(req).pipe(

      finalize(() => {

        const duration =
          performance.now() - start;

        console.log(
          `${req.method} ${req.url} took`,
          `${duration.toFixed(0)}ms`
        );

      })

    );
  };