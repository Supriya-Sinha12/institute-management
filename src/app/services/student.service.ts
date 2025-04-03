import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constant } from '../Constant/Constant';
import { GenericService } from './generic.service';
import { Student } from '../Model/interface/Student';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  http = inject(HttpClient);

  studentForm: FormGroup = new FormGroup({});

  constructor(private generic: GenericService<Student>) {
    this.initializeForm();
  }

  initializeForm(data?: Student) {
    this.studentForm = new FormGroup({
      studid: new FormControl(data?.studid ?? 0, [Validators.required]),
      name: new FormControl(data?.name ?? '', [Validators.required]),
      email: new FormControl(data?.email ?? '', [
        Validators.required,
        Validators.email,
      ]),
      phone: new FormControl(data?.phone ?? '', [
        Validators.required,
        Validators.minLength(10),
      ]),
      address: new FormControl(data?.address ?? '', [Validators.required]),
      city: new FormControl(data?.city ?? '', [Validators.required]),
      pinCode: new FormControl(data?.pinCode ?? '', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  createStudent(data: Student) {
    return this.http.post(Constant.API_METHOD.STUDENT.CREATE_STUDENT, data);
  }

  getAllStudent(): Observable<Student[]> {
    return this.http.get<Student[]>(
      Constant.API_METHOD.STUDENT.GET_ALL_STUDENT
    );
  }

  updateStudentDetail(studid: number, studData: any) {
    return this.http.put(
      Constant.API_METHOD.STUDENT.UPDATE_STUDENT + '?id=' + studid,
      studData
    );
  }

  deleteStudent(studid: number) {
    return this.http.delete(
      Constant.API_METHOD.STUDENT.DELETE_STUDENT + '?id=' + studid
    );
  }

  getAllStudentDetail(): Observable<Student[]> {
    return this.http.get<Student[]>(
      Constant.API_METHOD.STUDENT.GetStudentBatchesWithFees
    );
  }
}
