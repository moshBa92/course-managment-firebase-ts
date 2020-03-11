import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Course } from "./course.model";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CourseService {
  courseModeChanged = new Subject<Course[]>();
  courseToDisplayChanged = new Subject<any>();
  courses = [];

  constructor(private http: HttpClient, private router: Router) {}

  createAndStoreCourse(
    name: string,
    courseNum,
    startDate,
    weeklySessions,
    studentsDetails
  ) {
    const course: Course = {
      name,
      courseNum,
      startDate,
      weeklySessions,
      studentsDetails
    };
    this.http
      .post(
        "https://student-course-manage-system.firebaseio.com/courses.json",
        course
      )
      .subscribe((responseData) => {
        let courses: Course[];
        this.fetchCourses().subscribe((fechedCourses) => {
          courses = fechedCourses;
          this.courseModeChanged.next(courses);
        });
      });
  }

  fetchCourses() {
    return this.http
      .get("https://student-course-manage-system.firebaseio.com/courses.json")
      .pipe(
        map((responsedData) => {
          const courses = [];
          for (const key in responsedData) {
            courses.push({ ...responsedData[key], key: key });
          }
          this.courses = courses;
          return courses;
        })
      );
  }

  loadCourseDetailPage(courseNum) {
    this.router.navigate(["/course", courseNum]);
  }

  loadAssociatingStudentsWithCourseEditPage(courseNum) {
    this.router.navigate([
      "/admin",
      "associating-students-with-courses",
      courseNum
    ]);
    this.courseToDisplayChanged.next();
  }

  OpenStudentAttendensForm(courseNum, studentId) {
    this.router.navigate([
      "/admin",
      "add-students-attendant",
      courseNum,
      studentId
    ]);
  }

  loadAddStudentsAttendantListLoadPage(courseNum) {
    this.router.navigate(["/admin", "add-students-attendant", courseNum]);
    this.courseToDisplayChanged.next();
  }

  AssociatingStudentsWithCourse(studentObj, chosenCourse) {
    let courseToUpdate = chosenCourse;
    courseToUpdate.studentsDetails
      ? console.log("we have students")
      : (courseToUpdate.studentsDetails = []);
    courseToUpdate.studentsDetails.push(studentObj);
    return this.http
      .patch(
        "https://student-course-manage-system.firebaseio.com/courses/" +
          chosenCourse.key +
          ".json",
        courseToUpdate
      )
      .subscribe(() => {
        this.courseModeChanged.next(courseToUpdate);
      });
  }

  pushAttendanceForTheCourseStudent(
    date,
    isAttendant,
    existCourseKey,
    studentLocationById,
    courseObj
  ) {
    const specipicAttendance = { date, isAttendant };
    if (!courseObj.studentsDetails[studentLocationById].studentAtendance) {
      const studentAtendance = [];
      studentAtendance.push(specipicAttendance);
      console.log("studentAtendance created");
      courseObj.studentsDetails[
        studentLocationById
      ].studentAtendance = studentAtendance;
    } else
      courseObj.studentsDetails[studentLocationById].studentAtendance.push(
        specipicAttendance
      );
    this.http
      .patch(
        "https://student-course-manage-system.firebaseio.com/courses/" +
          existCourseKey +
          ".json",
        courseObj
      )
      .subscribe((resData) => {
        console.log(resData);
      });
  }

  pushExplenationToAttendanceOfSpecificStudent(
    existCourseKey,
    studentLocationById,
    LocationOfTheCorrentAttendance,
    explanetion,
    specipicAttendanceObj
  ) {
    specipicAttendanceObj.explanetion = explanetion;
    this.http
      .patch(
        "https://student-course-manage-system.firebaseio.com/courses/" +
          existCourseKey +
          "/studentsDetails/" +
          studentLocationById +
          "/studentAtendance/" +
          LocationOfTheCorrentAttendance +
          ".json",
        specipicAttendanceObj
      )
      .subscribe((resData) => {
        console.log(resData);
      });
  }

  getCourseByNumber(courseNum) {
    let courseToDisplay;
    for (let index in this.courses) {
      if (this.courses[index].courseNum == courseNum) {
        courseToDisplay = this.courses[index];
        break;
      }
    }
    return courseToDisplay;
  }

  getStudentdLocationInCourseById(studentId, course) {
    const studentsDetail = course.studentsDetails;
    let indexToReturn: any = false;
    for (let index in studentsDetail) {
      if (studentsDetail[index].studentId == studentId) {
        indexToReturn = index;
        break;
      }
    }
    return indexToReturn;
  }
}
