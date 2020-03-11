import { Course } from "./../../../course/course.model";
import { StudentService } from "./../../../student/student.service";
import { CourseService } from "src/app/course/course.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Student } from "src/app/student/student.model";
import { Subscription } from "rxjs";

@Component({
  selector: "app-associating-students-with-courses-edit",
  templateUrl: "./associating-students-with-courses-edit.component.html",
  styleUrls: ["./associating-students-with-courses-edit.component.css"]
})
export class AssociatingStudentsWithCoursesEditComponent
  implements OnInit, OnDestroy {
  course: Course;
  courseNum = 0;
  allCourses = [];
  courseToDisplay: {} = {};
  courseDetail = {};
  allStudents: Student[] = [];
  restOfTheStudents = [];
  subscription: Subscription;
  constructor(
    private courseService: CourseService,
    private studentService: StudentService,
    private route: ActivatedRoute
  ) {}

  get courseStudentsDetails() {
    if (this.courseDetail["studentsDetails"]) {
      return this.courseDetail["studentsDetails"];
    } else {
      return [];
    }
  }

  getRestOfTheStudents(allStudents, courseStudents) {
    if (courseStudents.length > allStudents.length) {
      return allStudents;
    }
    for (let i = 0; i < allStudents.length; i++) {
      for (let j = 0; j < courseStudents.length; j++) {
        if (allStudents[i].id == courseStudents[j].studentId) {
          allStudents.splice(i, 1);
        }
      }
    }
    return allStudents;
  }

  onAssociatingStudentsWithCourse(student) {
    const studentId = student.id;
    const studentName = student.name;
    const StudentObj = { studentId, studentName };
    this.courseService.AssociatingStudentsWithCourse(
      StudentObj,
      this.courseDetail
    );
  }

  ngOnInit() {
    this.updateAllCourseAndStudents();

    this.subscription = this.courseService.courseModeChanged.subscribe(() => {
      this.updateAllCourseAndStudents();
    });
    this.subscription = this.courseService.courseToDisplayChanged.subscribe(
      () => {
        setTimeout(() => {
          this.updateAllCourseAndStudents();
        }, 200);
      }
    );
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

      console.log(this.courseDetail);
      this.studentService.fetchStudents().subscribe((fachingStudents) => {
        this.allStudents = fachingStudents;
        this.restOfTheStudents = this.getRestOfTheStudents(
          this.allStudents.slice(),
          this.courseStudentsDetails
        );
      });
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
