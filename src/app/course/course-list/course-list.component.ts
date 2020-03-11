import { CourseService } from "./../course.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-course-list",
  templateUrl: "./course-list.component.html",
  styleUrls: ["./course-list.component.css"]
})
export class CourseListComponent implements OnInit, OnDestroy {
  courses;
  subscription: Subscription;

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.courseService.fetchCourses().subscribe((courses) => {
      this.courses = courses;
      console.log(this.courses);
    });
    this.subscription = this.courseService.courseToDisplayChanged.subscribe(
      (courses) => {
        this.courses = courses;
      }
    );
  }

  onCourseDetailPageLoad(courseNum) {
    this.courseService.loadCourseDetailPage(courseNum);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe;
  }
}
