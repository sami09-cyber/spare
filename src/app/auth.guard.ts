import {CanActivateFn, Router} from '@angular/router';
import {AuthenticationService} from "./service/authentication.service";
import {map} from "rxjs";
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);

  return authenticationService.getCurrentUser().pipe(
    map(user => {
      if (user) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
