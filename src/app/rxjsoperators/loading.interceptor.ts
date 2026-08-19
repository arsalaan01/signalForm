import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';
import { LoadingService } from './loading-service';

import { SKIP_LOADING } from './http-context-tokens';

export const loadingInterceptor: HttpInterceptorFn =
  (req, next) => {
    const loadingService = inject(LoadingService);
    const skipLoading = req.context.get(SKIP_LOADING) ?? false;

    if (skipLoading) {
      return next(req);
    }
    loadingService.show();

    return next(req).pipe(
      finalize(() => {
        loadingService.hide();
      })
    );
  };