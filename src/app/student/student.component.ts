import { Component, OnInit } from "@angular/core";
import { StudentService } from "./student.service";

@Component({
  selector: "app-student",
  templateUrl: "./student.component.html",
  styleUrls: ["./student.component.css"]
})
export class StudentComponent implements OnInit {
  students = [];
  constructor(private studentSrvice: StudentService) {}

  ngOnInit() {
    this.studentSrvice.fetchStudents().subscribe((fechedStudents) => {
      this.students = fechedStudents;
    });
  }
}
