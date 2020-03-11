import { StudentAttendanceByCourseComponent } from "./student/student-attendance/student-attendance-by-course/student-attendance-by-course.component";
import { StudentAttendantFormComponent } from "./admin/add-students-attendant/student-attendant-form/student-attendant-form.component";
import { StudentsListAttendantComponent } from "./admin/add-students-attendant/students-list-attendant/students-list-attendant.component";
import { AddStudentsAttendantComponent } from "./admin/add-students-attendant/add-students-attendant.component";
import { ChangePasswordComponent } from "./shared/change-password/change-password.component";
import { AuthAdminComponent } from "./auth/auth-admin/auth-admin.component";
import { AuthStudentComponent } from "./auth/auth-student/auth-student.component";
import { StudentAuthGuard } from "./auth/student-auth.guard";
import { AuthComponent } from "./auth/auth.component";
import { AssociatingStudentsWithCoursesComponent } from "./admin/associating-students-with-courses/associating-students-with-courses.component";
import { CourseComponent } from "./course/course.component";
import { AddStudentComponent } from "./admin/add-student/add-student.component";
import { CourseDetailComponent } from "./course/course-detail/course-detail.component";
import { AddCourseComponent } from "./admin/add-course/add-course.component";
import { AdminComponent } from "./admin/admin.component";
import { CourseListComponent } from "./course/course-list/course-list.component";
import { UniversityWebsiteComponent } from "./university-website/university-website.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StudentComponent } from "./student/student.component";
import { AssociatingStudentsWithCoursesEditComponent } from "./admin/associating-students-with-courses/associating-students-with-courses-edit/associating-students-with-courses-edit.component";
import { AdminUserAuthGourd } from "./auth/admin-auth.guard";
import { StudentAttendanceComponent } from "./student/student-attendance/student-attendance.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "university-website",
    pathMatch: "full"
  },
  {
    path: "university-website",
    component: UniversityWebsiteComponent,
    data: { animation: "university-website" }
  },
  {
    path: "course",
    component: CourseComponent,
    data: { animation: "course" },
    children: [
      {
        path: "course-list",
        component: CourseListComponent
      },
      {
        path: ":courseNum",
        component: CourseDetailComponent
      }
    ]
  },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AdminUserAuthGourd],
    data: { animation: "admin" },
    children: [
      {
        path: "add-course",
        component: AddCourseComponent
      },
      {
        path: "add-student",
        component: AddStudentComponent
      },
      {
        path: "associating-students-with-courses",
        component: AssociatingStudentsWithCoursesComponent,
        children: [
          {
            path: ":courseNum",
            component: AssociatingStudentsWithCoursesEditComponent
          }
        ]
      },
      {
        path: "add-students-attendant",
        component: AddStudentsAttendantComponent,
        children: [
          {
            path: ":courseNum",
            component: StudentsListAttendantComponent
          },
          {
            path: ":courseNum/:studentid",
            component: StudentAttendantFormComponent
          }
        ]
      }
    ]
  },
  {
    path: "student",
    component: StudentComponent,
    canActivate: [StudentAuthGuard],
    data: { animation: "student" },
    children: [
      {
        path: "attendance/:id",
        component: StudentAttendanceComponent,
        children: [
          {
            path: ":coursenum",
            component: StudentAttendanceByCourseComponent
          }
        ]
      }
    ]
  },
  {
    path: "auth",
    component: AuthComponent,
    data: { animation: "auth" },
    children: [
      {
        path: "student",
        component: AuthStudentComponent
      },
      {
        path: "admin",
        component: AuthAdminComponent
      }
    ]
  },
  {
    path: "change-password",
    component: ChangePasswordComponent
  },
  {
    path: "**",
    redirectTo: "university-website"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
