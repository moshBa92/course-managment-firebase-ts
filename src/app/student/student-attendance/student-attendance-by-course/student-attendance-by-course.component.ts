import { StudentService } from "src/app/student/student.service";
import { Subscription } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";
import { CourseService } from "src/app/course/course.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-student-attendance-by-course",
  templateUrl: "./student-attendance-by-course.component.html",
  styleUrls: ["./student-attendance-by-course.component.css"]
})
export class StudentAttendanceByCourseComponent implements OnInit {
  showContent: boolean = false;
  existCourse;
  existCourseKey;
  courseNum;
  studentId;
  studentLocationById;
  attendeceToDisplay = [];
  comment = null;
  courseSubscription = new Subscription();
  constructor(
    private courseService: CourseService,
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    setTimeout(() => (this.showContent = true), 1000);
    this.getAllAttendanceDetail();
    this.courseSubscription = this.studentService.courseToDisplayChanged.subscribe(
      () => {
        setTimeout(() => {
          this.getAllAttendanceDetail();
        }, 200);
      }
    );
  }

  onExplanationSend(explanetion, LocationOfTheCorrentAttendance) {
    const specipicAttendanceObj = this.attendeceToDisplay[
      LocationOfTheCorrentAttendance
    ];
    this.courseService.pushExplenationToAttendanceOfSpecificStudent(
      this.existCourseKey,
      this.studentLocationById,
      LocationOfTheCorrentAttendance,
      explanetion,
      specipicAttendanceObj
    );
  }

  getAllAttendanceDetail() {
    this.courseNum = this.route.snapshot.params["coursenum"];
    this.studentId = this.route.snapshot.parent.params["id"];
    this.courseService.fetchCourses().subscribe((courses) => {
      this.existCourse = this.courseService.getCourseByNumber(this.courseNum);
      this.studentLocationById = this.courseService.getStudentdLocationInCourseById(
        this.studentId,
        this.existCourse
      );
      this.existCourseKey = this.existCourse.key;
      if (this.studentLocationById) {
        if (
          this.existCourse.studentsDetails[this.studentLocationById]
            .studentAtendance
        ) {
          this.attendeceToDisplay = this.existCourse.studentsDetails[
            this.studentLocationById
          ].studentAtendance;
        } else {
          this.attendeceToDisplay = [];
        }
      } else {
        this.attendeceToDisplay = null;
      }
    });
  }
}
