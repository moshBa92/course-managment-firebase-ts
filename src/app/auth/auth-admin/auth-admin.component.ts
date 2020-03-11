import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-auth-admin",
  templateUrl: "./auth-admin.component.html",
  styleUrls: ["./auth-admin.component.css"]
})
export class AuthAdminComponent implements OnInit {
  error: string = null;
  welcomeMessage: string = null;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onSubmit(loginForm: NgForm) {
    const email = loginForm.value.email;
    const password = loginForm.value.password;
    const isAdminLoginHappend = this.authService.adminLogin(email, password);
    if (!isAdminLoginHappend) {
      this.error = "An error accoured ! please try again..";
    } else {
      this.error = null;
      this.welcomeMessage = "welcome admin";
      setTimeout(() => {
        this.router.navigate(["/"]);
      }, 1000);
    }
    loginForm.reset();
  }
}
