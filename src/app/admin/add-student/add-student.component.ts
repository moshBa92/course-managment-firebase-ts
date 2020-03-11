import { AuthService } from "./../../auth/auth.service";
import { StudentService } from "./../../student/student.service";
import { HttpClient } from "@angular/common/http";

import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-add-student",
  templateUrl: "./add-student.component.html",
  styleUrls: ["./add-student.component.css"]
})
export class AddStudentComponent implements OnInit {
  studentForm: FormGroup;

  constructor(
    private http: HttpClient,
    private studentService: StudentService,
    private authSrvice: AuthService
  ) {
    this.studentForm = new FormGroup({
      studentPersonalData: new FormGroup({
        name: new FormControl("", Validators.required),
        id: new FormControl("", [
          Validators.required,
          ,
          Validators.min(100000000),
          Validators.max(999999999)
        ]),
        city: new FormControl("", Validators.required),
        phoneNumber: new FormControl("", [
          Validators.required,
          ,
          Validators.min(100000000),
          Validators.max(999999999)
        ])
      }),
      studentUserData: new FormGroup({
        password: new FormControl("", [
          Validators.required,
          Validators.minLength(6)
        ])
      })
    });
  }

  ngOnInit() {}

  onSubmit() {
    const name = this.studentForm.value.studentPersonalData.name;
    const id = this.studentForm.value.studentPersonalData.id + "";
    const city = this.studentForm.value.studentPersonalData.city;
    const phoneNumber = this.studentForm.value.studentPersonalData.phoneNumber;

    const email: string = id.trim().replace(" ", "") + "@gmail.com";
    const password :string = this.studentForm.value.studentUserData.password;
    const studentRegisterDiteils={email,password};
    console.log(studentRegisterDiteils);
    this.studentService.createAndStoreStudent(name, id, city, phoneNumber);
    this.authSrvice.studentSignUp(studentRegisterDiteils)
    .subscribe(
      (resData) => {
        console.log(resData);
      },
      (error) => {
        console.log(error);
      }
    );
    this.studentForm.reset();
  }
}
