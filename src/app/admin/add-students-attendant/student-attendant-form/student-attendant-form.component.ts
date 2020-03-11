import { ActivatedRoute, Router } from "@angular/router";
import { CourseService } from "src/app/course/course.service";
import { NgForm } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-student-attendant-form",
  templateUrl: "./student-attendant-form.component.html",
  styleUrls: ["./student-attendant-form.component.css"]
})
export class StudentAttendantFormComponent implements OnInit {
  existCourse;
  existCourseKey;
  courseNum;
  studentId;
  studentLocationById;
  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit() {
    this.courseNum = this.route.snapshot.params["courseNum"];
    this.studentId = this.route.snapshot.params["studentid"];
    this.courseService.fetchCourses().subscribe((courses) => {
      this.existCourse = this.courseService.getCourseByNumber(this.courseNum);
      this.studentLocationById = this.courseService.getStudentdLocationInCourseById(
        this.studentId,
        this.existCourse
      );
      this.existCourseKey = this.existCourse.key;
    });
  }

  onSubmit(attendantForm: NgForm) {
    const date = attendantForm.value.date;
    const isAttendant =
      attendantForm.value.isAttendant == "true" ? true : false;
    this.courseService.pushAttendanceForTheCourseStudent(
      date,
      isAttendant,
      this.existCourseKey,
      this.studentLocationById,
      this.existCourse
    );
    attendantForm.reset();
    this.router.navigate(['/admin','add-students-attendant',this.courseNum])
  }
}
