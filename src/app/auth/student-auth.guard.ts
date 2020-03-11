import { map, tap, take } from "rxjs/operators";
import { AuthService } from "./auth.service";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class StudentAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ): boolean | Promise<boolean> | Observable<boolean> {
    return this.authService.studentUser.pipe(
      take(1),
      map((studentUser) => {
        return !!studentUser;
      }),
      tap((isAuth) => {
        if (!isAuth) {
          this.router.navigate([""]);
        }
      })
    );
  }
}
