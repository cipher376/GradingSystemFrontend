import { Grade } from "./grade";
import { Programme } from "./programme";

export class Course  {
  id?: string;
  name?: string;
  creditHours?: number;
  code?: string;

  grades?: Grade[];
  programmes?: Programme[];
  lecturerId?: string;

  constructor() {
  }
}

export class CourseProgrammeThrough {
  id?: string;
  programmeId?: string;
  courseId?: string;

  constructor() {
  }
}
