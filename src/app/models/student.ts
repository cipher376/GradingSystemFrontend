import { User } from ".";
import { AcademicRecord } from "./AcademicRecord";
import { Grade } from "./grade";

export class Student {

  id?: string;
  user?: User;
  academicRecords?: AcademicRecord[];
  programmeId?: string;
  grades?: Grade[];

  constructor() {
  }
}
