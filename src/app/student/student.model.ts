export class Student {
  public name: string;
  public id: string;
  public phoneNum: number;
  public city: string;
  public studentRegisterDiteils?: [{email: string; password: string}];

  constructor(
    name: string,
    id: string,
    phoneNum: number,
    city: string,
    studentRegisterDiteils
  ) {
    this.name = name;
    this.id = id;
    this.phoneNum = phoneNum;
    this.city = city;
    this.studentRegisterDiteils = studentRegisterDiteils;
  }
}
