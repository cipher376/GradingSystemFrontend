import { Course, CourseProgrammeThrough } from './../../models/course';
import { Programme } from './../../models/programme';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MyLocalStorageService, UtilityService } from ".";
import { SignalService } from "./signal.service";
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AcademicRecord } from 'src/app/models/AcademicRecord';
import { Student } from 'src/app/models/student';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(
    // private _geolocation: Geolocation,
    private store: MyLocalStorageService,
    private _signal: SignalService,
    private http: HttpClient,
  ) { }

  createProgramme(programme: Programme) {
    if (programme.id) {
      //update
      return this.http.patch<Programme>(environment.api_root_url + `/programmes/`, programme).pipe(
        map(res => {
          console.log(res)
          return programme as any;
        }),
        catchError(e => this.handleError(e))
      );
    } else {
      return this.http.post<Programme>(environment.api_root_url + `/programmes/`, programme).pipe(
        map(res => {
          console.log(res)
          return res as any;
        }),
        catchError(e => this.handleError(e))
      );
    }
  }
  getProgrammes() {
    return this.http.get<Programme[]>(environment.api_root_url + `/programmes`).pipe(
      map(res => {
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }
  deleteProgramme(id: any) {
    return this.http.delete(environment.api_root_url + `/programmes/` + id).pipe(
      map(res => {
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }



  createCourse(course: Course) {
    if (course.id) {
      //update
      return this.http.patch<Course>(environment.api_root_url + `/courses/`, course).pipe(
        map(res => {
          console.log(res)
          return course as any;
        }),
        catchError(e => this.handleError(e))
      );
    } else {
      return this.http.post<Course>(environment.api_root_url + `/courses/`, course).pipe(
        map(res => {
          console.log(res)
          return res as any;
        }),
        catchError(e => this.handleError(e))
      );
    }

  }
  getCourses() {
    return this.http.get<Course[]>(environment.api_root_url + `/courses`).pipe(
      map(res => {
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }

  deleteCourse(id: any) {
    return this.http.delete(environment.api_root_url + `/courses/` + id).pipe(
      map(res => {
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }

  linkCourseToProgramme(courseProgramme: CourseProgrammeThrough){
    return this.http.post<CourseProgrammeThrough>(environment.api_root_url + `/course-programme-throughs/`, courseProgramme).pipe(
      map(res => {
        console.log(res)
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }

  removeCourseFromProgramme(id: string){
    return this.http.delete(environment.api_root_url + `/course-programme-throughs`).pipe(
      map(res => {
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }

  createAcademicRecord(studentId: any, record: AcademicRecord) {
    if (record.id) {
      //update
      return this.http.patch(environment.api_root_url + `/students/${studentId}/academic-records/`, record).pipe(
        map(res => {
          console.log(res)
          return record as any;
        }),
        catchError(e => this.handleError(e))
      );
    } else {
      return this.http.post<AcademicRecord>(environment.api_root_url + `/students/${studentId}/academic-records/`, record).pipe(
        map(res => {
          console.log(res)
          return res as any;
        }),
        catchError(e => this.handleError(e))
      );
    }

  }
  getStudentAcademicRecord(studentId: any) {
    return this.http.get<Course[]>(environment.api_root_url + `/students/${studentId}/academic-records/`).pipe(
      map(res => {
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }

  createStudent(student: Student) {
    if (student.id) {
      //update
      return this.http.patch(environment.api_root_url + `/students`, student).pipe(
        map(res => {
          console.log(res)
          return student as any;
        }),
        catchError(e => this.handleError(e))
      );
    } else {
      return this.http.post<AcademicRecord>(environment.api_root_url + `/students`, student).pipe(
        map(res => {
          console.log(res)
          return res as any;
        }),
        catchError(e => this.handleError(e))
      );
    }
  }

  getStudent() {
    const filter = {
      include: [{
        relation: 'academicRecords'
      },
    {
      relation: 'programme'
    }, {
      relation: 'grades'
    }]
    }
    return this.http.get<Course[]>(environment.api_root_url + `/students?filter=${JSON.stringify(filter)}`).pipe(
      map(res => {
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }

  getStudentById(studentId: any) {
    const filter = {
      include: [{
        relation: 'academicRecords'
      },
    {
      relation: 'programme'
    }, {
      relation: 'grades'
    }]
    }
    return this.http.get<Student>(environment.api_root_url + `/students/${studentId}?filter=${JSON.stringify(filter)}`).pipe(
      map(res => {
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }

  getStudentByUserId(userId: any) {
    const filter = {
      include: [{
        relation: 'academicRecords'
      },
    {
      relation: 'programme'
    }, {
      relation: 'grades'
    }]
    }
    return this.http.get<Student>(environment.api_root_url + `/users/${userId}/student?filter=${JSON.stringify(filter)}`).pipe(
      map(res => {
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }

  // addUserToRole(role: string, userId: any) {
  //   this.http.post<Role>(environment.api_root_url + `/users/${userId}/role`, { role, userId }).pipe(
  //     map(res => {
  //       console.log(res.role)
  //       return res as any;
  //     }),
  //     catchError(e => this.handleError(e))
  //   );
  // }

  // getUserRolesGrading(userId: any) {
  //   return this.http.get<Role>(environment.api_root_url + `/users/${userId}/role`).pipe(
  //     map(res => {
  //       console.log(res)
  //       const userPolicies: string[] = [res?.role || ''];
  //       this.setUserPoliciesLocal(userPolicies);
  //       return userPolicies as any;
  //     }),
  //     catchError(e => this.handleError(e))
  //   );
  // }



  private handleError(e: any): any {
    // console.log(e);
    return throwError(UtilityService.myHttpErrorFormat(e, 'user'));
  }

}
