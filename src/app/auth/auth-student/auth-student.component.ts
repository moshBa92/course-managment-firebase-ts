import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-auth-student",
  templateUrl: "./auth-student.component.html",
  styleUrls: ["./auth-student.component.css"]
})
export class AuthStudentComponent implements OnInit {
  error: string = null;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onSubmit(loginForm: NgForm) {
    const email = loginForm.value.email;
    const password = loginForm.value.password;
    this.authService.studentLogin(email, password).subscribe(
      (resData) => {                                   //if i have object(user)
        console.log(resData);
        this.router.navigate(["/university-website"]);
      },
      (errorMessage) => {                              //if not
        console.log(errorMessage);
        this.error = errorMessage;
      }
    );
    loginForm.reset();
  }
}
