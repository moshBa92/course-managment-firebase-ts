import { Router } from "@angular/router";
import { StudentService } from "./../student/student.service";
import { Subscription } from "rxjs";
import { AuthService } from "./../auth/auth.service";
import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  isStudentLogIn = false;
  isAdminLogIn = false;
  private studentSub: Subscription;
  private adminSub: Subscription;
  studentName: string = null;
  studentId: string = null;
  constructor(
    private authService: AuthService,
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.studentSub = this.authService.studentUser.subscribe((studentUser) => {
      this.isStudentLogIn = !!studentUser;
      if (this.isStudentLogIn) {
        this.studentService.refreshStudents();
        setTimeout(() => {
          this.studentName = this.studentService.getStudentNameFromEmail(
            studentUser.email
          );
          this.studentId = this.studentService.getStudentIdFromEmail(
            studentUser.email
          );
        }, 600);
      } else {
        this.studentName = null;
      }
    });
    this.adminSub = this.authService.adminUser.subscribe(() => {
      this.isAdminLogIn = JSON.parse(localStorage.getItem("isAdminLog?"));
    });
    setTimeout(() => {
      this.isAdminLogIn = JSON.parse(localStorage.getItem("isAdminLog?"));
    }, 2000);

    this.studentService.refreshStudents();
  }

  onStudentNavigateToAttendancePage() {
    this.router.navigate(["/student", "attendance", this.studentId]);
  }

  onStudentLogout() {
    this.authService.studentLogOut();
  }
  onAdminLogout() {
    this.authService.adminLogout();
  }
  ngOnDestroy() {
    this.studentSub.unsubscribe();
    this.adminSub.unsubscribe();
  }
}
