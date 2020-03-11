import { Router } from "@angular/router";
import { AuthService } from "./../auth/auth.service";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Student } from "./student.model";
import { map, take, exhaustMap } from "rxjs/operators";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class StudentService {
  allStudents = [];
  courseToDisplayChanged = new Subject<any>();
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {
    this.fetchStudents().subscribe((students) => {
      this.allStudents = students;
    });
  }

  refreshStudents() {
    this.fetchStudents().subscribe((students) => {
      this.allStudents = students;
    });
  }

  createAndStoreStudent(
    name: string,
    id: string,
    city: string,
    phoneNum: number
  ) {
    const student: Student = { name, id, phoneNum, city };
    this.http
      .post(
        "https://student-course-manage-system.firebaseio.com/students.json",
        student
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  fetchStudents() {
    return this.http
      .get("https://student-course-manage-system.firebaseio.com/students.json")
      .pipe(
        map((responsedData) => {
          const students = [];
          for (const key in responsedData) {
            students.push({ ...responsedData[key], key: key });
          }
          return students;
        })
      );
  }

  getStudentNameFromEmail(studentEmail: string) {
    let extractId = "";
    for (let char of studentEmail) {
      if (char === "@") {
        break;
      }
      extractId += char;
    }
    for (let i in this.allStudents) {
      if (this.allStudents[i].id == extractId) {
        return this.allStudents[i].name;
      }
    }
  }
  getStudentIdFromEmail(studentEmail: string) {
    let extractId = "";
    for (let char of studentEmail) {
      if (char === "@") {
        break;
      }
      extractId += char;
    }
    return extractId;
  }

  StudentsAttendantListLoad(studentId, courseNum) {
    this.router.navigate(["student", "attendance", studentId, courseNum]);
    this.courseToDisplayChanged.next();
  }
}
