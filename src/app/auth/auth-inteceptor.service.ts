import { AuthService } from './auth.service';
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams
} from "@angular/common/http";
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInteceptorService implements HttpInterceptor {
    constructor(private authService:AuthService){}
  intercept(req: HttpRequest<any>, next: HttpHandler){
    return this.authService.studentUser.pipe(
        take(1),
        exhaustMap((studentUser) => {
            if(!studentUser){
                return next.handle(req);
            }
            const modifiedReq=req.clone({params:new HttpParams().set('auth',studentUser.token)})
            return next.handle(modifiedReq);
        }));
  }
}
