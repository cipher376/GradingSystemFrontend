import { User } from ".";
import { AcademicRecord } from "./AcademicRecord";
import { Grade } from "./grade";

export class Student {

  id?: string;
  user?: User;
  isComplete?: boolean;
  academicRecords?: AcademicRecord[];
  programmeId?: string;
  grades?: Grade[];
  userId?: string;

  constructor() {
  }
}
