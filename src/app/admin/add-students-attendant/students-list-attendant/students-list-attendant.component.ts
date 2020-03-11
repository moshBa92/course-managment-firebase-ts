import { Component, OnInit, OnDestroy } from "@angular/core";
import { Course } from "src/app/course/course.model";
import { Student } from "src/app/student/student.model";
import { Subscription } from "rxjs";
import { CourseService } from "src/app/course/course.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-students-list-attendant",
  templateUrl: "./students-list-attendant.component.html",
  styleUrls: ["./students-list-attendant.component.css"]
})
export class StudentsListAttendantComponent implements OnInit, OnDestroy {
  course: Course;
  courseNum = 0;
  allCourses = [];
  courseToDisplay: {} = {};
  courseDetail = {};
  allStudents: Student[] = [];
  subscription: Subscription;
  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.updateAllCourseAndStudents();


    this.subscription = this.courseService.courseToDisplayChanged.subscribe(
      () => {
        setTimeout(() => {
          this.updateAllCourseAndStudents();
        }, 100);
      }
    );
  }

  get courseStudentsDetails() {
    if (this.courseDetail["studentsDetails"]) {
      return this.courseDetail["studentsDetails"];
    } else {
      return [];
    }
  }

  onOpenStudentAttendensForm(student) {
  this.courseService.OpenStudentAttendensForm(this.courseNum,student.studentId);
  }

  updateAllCourseAndStudents() {
    this.courseNum = this.route.snapshot.params["courseNum"];
    this.courseService.fetchCourses().subscribe((fachingCourses) => {
      this.allCourses = fachingCourses;
      const coursesTemp = this.allCourses.filter((course) => {
        return this.courseNum == course.courseNum;
      });
      this.courseToDisplay = coursesTemp;
      this.courseDetail = this.courseToDisplay[0];
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
