import { StudentService } from "./../../student/student.service";
import { Course } from "src/app/course/course.model";
import { CourseService } from "./../course.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-course-detail",
  templateUrl: "./course-detail.component.html",
  styleUrls: ["./course-detail.component.css"]
})    
export class CourseDetailComponent implements OnInit {
  courseNum;
  allCourses = [];
  courseToDisplay = [];
  courseStudents = [];

  get students() {
    return this.courseStudents['studentsDetails'];
  }

  subscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private studentService: StudentService
  ) {}

  ngOnInit() {
    this.courseNum = this.route.snapshot.params["courseNum"];
    this.courseService.fetchCourses().subscribe((fachingCourses) => {
      this.allCourses = fachingCourses;
      const coursesTemp = this.allCourses.filter((course) => {
        return this.courseNum == course.courseNum;
      });
      this.courseToDisplay = coursesTemp;
      this.courseStudents = this.courseToDisplay[0];
    });
    
  }
}
