export class Course {
  public name: string;
  public courseNum: number;
  public startDate: string;
  public weeklySessions: number;
  public studentsDetails: {
    studentId;
    studentNames;
    studentAtendance?:[];
  }[];

  constructor(
    name: string,
    courseNum: number,
    startDate: string,
    weeklySessions: number,
    studentsDetails
  ) {
    this.name = name;
    this.courseNum = courseNum;
    this.startDate = startDate;
    this.weeklySessions = weeklySessions;
    this.studentsDetails = studentsDetails;
  }
}
