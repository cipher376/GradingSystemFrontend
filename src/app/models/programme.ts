import { Hod } from ".";
import { Course } from "./course";
import { Student } from "./student";

export class Programme  {

  id?: string;
  name?: string;
  numberYears?: number;
  students?: Student[];
  courses?: Course[];
  hod?: Hod;

  constructor() {
  }
}
