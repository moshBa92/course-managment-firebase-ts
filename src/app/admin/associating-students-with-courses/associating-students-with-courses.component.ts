import { CourseService } from "./../../course/course.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-associating-students-with-courses",
  templateUrl: "./associating-students-with-courses.component.html",
  styleUrls: ["./associating-students-with-courses.component.css"]
})
export class AssociatingStudentsWithCoursesComponent implements OnInit {
  courses;
  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.courseService.fetchCourses().subscribe((courses) => {
      this.courses = courses;
    });
  }

  onAssociatingStudentsWithCourseLoad(courseNum) {
    this.courseService.loadAssociatingStudentsWithCourseEditPage(courseNum);
  }
}
