import { StudentService } from 'src/app/student/student.service';
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { CourseService } from "src/app/course/course.service";

@Component({
  selector: "app-student-attendance",
  templateUrl: "./student-attendance.component.html",
  styleUrls: ["./student-attendance.component.css"]
})
export class StudentAttendanceComponent implements OnInit {
  courses;
  studentId;
  constructor(
    private courseService: CourseService,
    private studentSrevice:StudentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.courseService.fetchCourses().subscribe((courses) => {
      this.courses = courses;
    });
    this.studentId = this.route.snapshot.params["id"];
  }

  onStudentsAttendantListLoad(courseNum) {
    this.studentSrevice.StudentsAttendantListLoad(this.studentId, courseNum);
  }
}
