import { StudentUser } from "./../../auth/student-user.model";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.css"]
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  @ViewChild("openModal", { static: true }) private openModal: ElementRef;
  @ViewChild("closeBottun", { static: true }) private closeBottun: ElementRef;
  isStudentLogIn = false;
  isAdminLogIn = false;
  private studentSub: Subscription;
  private adminSub: Subscription;
  message: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.studentSub = this.authService.studentUser.subscribe((studentUser) => {
      this.isStudentLogIn = !!studentUser;
    });
    this.adminSub = this.authService.adminUser.subscribe(() => {
      this.isAdminLogIn = JSON.parse(localStorage.getItem("isAdminLog?"));
    });
    setTimeout(() => {
      this.isAdminLogIn = JSON.parse(localStorage.getItem("isAdminLog?"));
    }, 2000);

    setTimeout(() => {
      this.openModal.nativeElement.click();
    }, 100);
  }

  onSubmit(changePasswordForm: NgForm) {
    const newPassword = changePasswordForm.value.newPassword;
    const confirmNewPassword = changePasswordForm.value.confirmNewPassword;
    if (this.isAdminLogIn && newPassword === confirmNewPassword) {
      const isPasswordChange = this.authService.changeAdminPassword(
        newPassword
      );

      if (isPasswordChange) {
        this.message = "succes";
        setTimeout(() => {
          this.closeBottun.nativeElement.click();
        }, 1000);

        setTimeout(() => {
          this.router.navigate(["/"]);
        }, 2000);
      }
    } else if (this.isStudentLogIn && newPassword === confirmNewPassword) {
      const studentUser = JSON.parse(localStorage.getItem("studentUserData"));
      const studentUserToken = studentUser._token;
      this.authService
        .changeStudentPassword(newPassword, studentUserToken)
        .subscribe(
          (resdata) => {
            console.log(resdata);
            this.message = "succes";
            setTimeout(() => {
              this.closeBottun.nativeElement.click();
            }, 1000);

            setTimeout(() => {
              this.router.navigate(["/"]);
            }, 2000);
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      this.message = "Please enter similar passwords";
    }
    changePasswordForm.reset();
  }

  ngOnDestroy() {
    this.studentSub.unsubscribe();
    this.adminSub.unsubscribe();
  }
}
