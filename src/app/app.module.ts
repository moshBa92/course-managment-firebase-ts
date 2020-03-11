import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { UniversityWebsiteComponent } from "./university-website/university-website.component";
import { HeaderComponent } from "./header/header.component";
import { AdminComponent } from "./admin/admin.component";
import { AddCourseComponent } from "./admin/add-course/add-course.component";
import { AddStudentComponent } from "./admin/add-student/add-student.component";
import { AssociatingStudentsWithCoursesComponent } from "./admin/associating-students-with-courses/associating-students-with-courses.component";
import { AssociatingStudentsWithCoursesEditComponent } from "./admin/associating-students-with-courses/associating-students-with-courses-edit/associating-students-with-courses-edit.component";
import { StudentComponent } from "./student/student.component";
import { CourseListComponent } from "./course/course-list/course-list.component";
import { CourseComponent } from "./course/course.component";
import { CourseDetailComponent } from "./course/course-detail/course-detail.component";
import { AuthComponent } from "./auth/auth.component";
import { AuthStudentComponent } from "./auth/auth-student/auth-student.component";
import { AuthAdminComponent } from "./auth/auth-admin/auth-admin.component";
import { AuthInteceptorService } from "./auth/auth-inteceptor.service";
import { ChangePasswordComponent } from './shared/change-password/change-password.component';
import { AddStudentsAttendantComponent } from './admin/add-students-attendant/add-students-attendant.component';
import { StudentsListAttendantComponent } from './admin/add-students-attendant/students-list-attendant/students-list-attendant.component';
import { StudentAttendantFormComponent } from './admin/add-students-attendant/student-attendant-form/student-attendant-form.component';
import { StudentAttendanceComponent } from './student/student-attendance/student-attendance.component';
import { StudentAttendanceByCourseComponent } from './student/student-attendance/student-attendance-by-course/student-attendance-by-course.component';

@NgModule({
  declarations: [
    AppComponent,
    UniversityWebsiteComponent,
    HeaderComponent,
    StudentComponent,
    AdminComponent,
    CourseListComponent,
    AddCourseComponent,
    CourseComponent,
    CourseDetailComponent,
    AddStudentComponent,
    AssociatingStudentsWithCoursesComponent,
    AssociatingStudentsWithCoursesEditComponent,
    AuthComponent,
    AuthStudentComponent,
    AuthAdminComponent,
    ChangePasswordComponent,
    AddStudentsAttendantComponent,
    StudentsListAttendantComponent,
    StudentAttendantFormComponent,
    StudentAttendanceComponent,
    StudentAttendanceByCourseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInteceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
