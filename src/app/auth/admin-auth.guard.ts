import { AuthService } from "./auth.service";

import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AdminUserAuthGourd implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService
      .getIsAdminAuthnticate()
      .then((authenticated: boolean) => {
        if (authenticated) {
          console.log("aoutenticate!!!");
          return true;
        } else {
          this.router.navigate([""]);
          return false;
        }
      });
  }
}
