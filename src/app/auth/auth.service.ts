import { Admin } from "./../admin/admin.model";
import { AdminUser } from "./admin-user.model";
import { Router } from "@angular/router";
import { StudentUser } from "./student-user.model";
import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { throwError, BehaviorSubject, Subject } from "rxjs";
interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private admin: Admin;
  adminUser = new Subject<AdminUser>();
  private isAdminLogin: boolean = null;

  studentUser = new BehaviorSubject<StudentUser>(null);
  private studentTokenExpirationTimer: any;
  // token: string = null;

  constructor(private http: HttpClient, private router: Router) {
    this.admin = this.getAdmin();
    this.isAdminLogin = this.adminAuthentiction;
  }

  get adminAuthentiction() {
    return JSON.parse(localStorage.getItem("isAdminLog?"));
  }

  getAdmin() {
    let adminToReturn;
    if (JSON.parse(localStorage.getItem("adminUser"))) {
      adminToReturn = JSON.parse(localStorage.getItem("adminUser"));
    } else {
      adminToReturn = new AdminUser("admin1@gmail.com", "123456");
      localStorage.setItem("adminUser", JSON.stringify(adminToReturn));
    }
    return adminToReturn;
  }

  adminLogin(email: string, password: string) {
    let adminTOcheck: AdminUser = JSON.parse(localStorage.getItem("adminUser"));
    if (adminTOcheck.email == email && adminTOcheck.password == password) {
      localStorage.setItem("isAdminLog?", JSON.stringify(true));
      this.isAdminLogin = true;
      this.adminUser.next();
      return true;
    } else {
      return false;
    }
  }

  adminLogout() {
    localStorage.setItem("isAdminLog?", JSON.stringify(false));
    this.isAdminLogin = false;
    this.adminUser.next();
  }

  getIsAdminAuthnticate() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.isAdminLogin);
      }, 10);
    });
    return promise;
  }

  changeAdminPassword(newPassword: string) {
    this.admin.password = newPassword;
    localStorage.setItem("adminUser", JSON.stringify(this.admin));
    this.adminUser.next();
    return true;
  }

  studentSignUp(studentRegisterDiteils) {
    const email = studentRegisterDiteils.email;
    const password = studentRegisterDiteils.password;
    return this.http.post<AuthResponseData>(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCE25JQxX-QJfgbAOeknj6DUYDbA2Up7Hs",
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    );
  }

  studentLogin(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCE25JQxX-QJfgbAOeknj6DUYDbA2Up7Hs",
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError((errorRes) => {
          let errorMessage = "An unknown error occured!";
          if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
          }
          switch (errorRes.error.error.message) {
            case "INVALID_PASSWORD":
              errorMessage = "invalid Password";
              break;
            case "EMAIL_NOT_FOUND":
              errorMessage = "email not found";
              break;
          }
          return throwError(errorMessage);
        }),
        tap((resData) => {
          const expirationDate = new Date(
            new Date().getTime() + +resData.expiresIn * 1000
          );
          const studentUser = new StudentUser(
            resData.email,
            resData.localId,
            resData.idToken,
            expirationDate
          );
          this.studentUser.next(studentUser);
          console.log("login the atudent");
          this.autoStudentLogout();
          localStorage.setItem("studentUserData", JSON.stringify(studentUser));
        })
      );
  }

  autoStudentLogin() {
    const studentUserData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem("studentUserData"));
    if (!studentUserData) {
      return;
    }
    const loadedStudentUser = new StudentUser(
      studentUserData.email,
      studentUserData.id,
      studentUserData._token,
      new Date(studentUserData._tokenExpirationDate)
    );
    if (loadedStudentUser.token) {
      this.studentUser.next(loadedStudentUser);
      const expirationDuration =
        new Date(studentUserData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoStudentLogout();
    }
  }

  studentLogOut() {
    this.studentUser.next(null);
    this.router.navigate(["/"]);
    localStorage.removeItem("studentUserData");
    if (this.studentTokenExpirationTimer) {
      clearTimeout(this.studentTokenExpirationTimer);
    }
    this.studentTokenExpirationTimer = null;
  }

  autoStudentLogout() {
    const studentUserLogoutTime: number = 3600000000000;
    this.studentTokenExpirationTimer = setTimeout(() => {
      this.studentLogOut();
    }, studentUserLogoutTime);
  }

  changeStudentPassword(newPassword: string, studentUserToken: string) {
    return this.http.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCE25JQxX-QJfgbAOeknj6DUYDbA2Up7Hs",
      {
        idToken: studentUserToken,
        password: newPassword,
        returnSecureToken: true
      }
    );
  }
}
