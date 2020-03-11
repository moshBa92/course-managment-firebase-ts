import { AuthService } from "./auth/auth.service";
import { Component, OnInit } from "@angular/core";

import {
  trigger,
  transition,
  group,
  query,
  style,
  animate
} from "@angular/animations";
import { slideInAnimation } from './ route-animation';
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  animations: [slideInAnimation]
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.authService.autoStudentLogin();
  }

  getDepth(outlet) {
    return outlet.activatedRouteData["depth"];
  }
}
