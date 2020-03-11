import { Student } from "./../../student/student.model";
import { StudentService } from "./../../student/student.service";
import { CourseService } from "../../course/course.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { Course } from "src/app/course/course.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-course",
  templateUrl: "./add-course.component.html",
  styleUrls: ["./add-course.component.css"]
})
export class AddCourseComponent implements OnInit {
  courseForm: FormGroup;
  students: Student[];
  constructor(
    private studentService: StudentService,
    private courseService: CourseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.studentService.fetchStudents().subscribe((fetchedStudents: []) => {
      this.students = fetchedStudents;
    });
    this.courseForm = new FormGroup({
      name: new FormControl("", Validators.required),
      courseNum: new FormControl("", [
        Validators.minLength(5),
        Validators.maxLength(5),
        Validators.required
      ]),
      startDate: new FormControl("", Validators.required),
      weeklySessions: new FormControl("", Validators.required),
      students: new FormArray([])
    });
  }

  onCheckChange(event, student) {
    const formArray: FormArray = this.courseForm.get("students") as FormArray;
    if (event.target.checked) {
      formArray.push(new FormControl(student));
    } else {
      let i: number = 0;

      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value === student) {
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  getCurrectArray(array: []) {
    let arr: [] = array;
    for (let i in arr) {
      if (arr[i] === null) {
        arr.splice(parseFloat(i), 1);
      }
    }
    return arr;
  }

  getStudentsDetail(students) {
    const studentsToReturn = students.map((student) => {
      const studentId = student.id;
      const studentName = student.name;
      const studentObj = { studentId, studentName };
      return studentObj;
    });
    return studentsToReturn;
  }

  onSubmit() {
    const name = this.courseForm.value.name;
    const courseNum = this.courseForm.value.courseNum;
    const startDate = this.courseForm.value.startDate;
    const weeklySessions = this.courseForm.value.weeklySessions;

    const studentsDetails = this.getStudentsDetail(
      this.getCurrectArray(this.courseForm.value.students)
    );
    console.log(studentsDetails);
    const course: Course = {
      name,
      courseNum,
      startDate,
      weeklySessions,
      studentsDetails
    };
    this.courseService.createAndStoreCourse(
      course.name,
      course.courseNum,
      course.startDate,
      course.weeklySessions,
      course.studentsDetails
    );
    this.courseForm.reset();
    this.router.navigate(["/course/course-list"]);
  }
}
