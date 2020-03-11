import { Component, OnInit } from "@angular/core";
import { CourseService } from "src/app/course/course.service";

@Component({
  selector: "app-add-students-attendant",
  templateUrl: "./add-students-attendant.component.html",
  styleUrls: ["./add-students-attendant.component.css"]
})
export class AddStudentsAttendantComponent implements OnInit {
  courses;
  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.courseService.fetchCourses().subscribe((courses) => {
      this.courses = courses;
    });
  }

  onAddStudentsAttendantListLoad(courseNum) {
    this.courseService.loadAddStudentsAttendantListLoadPage(courseNum);
  }
}
