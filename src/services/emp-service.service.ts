import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeDetails } from '../users.models';

@Injectable({
  providedIn: 'root'
})
export class EmpServiceService {
  private url = "http://localhost:5002/api/users";
  constructor(private http: HttpClient) { }

  getEmp(): Observable<EmployeeDetails[]> {
    return this.http.get<EmployeeDetails[]>(`${this.url}`);
    
  }
  deleteEmp(id:any):Observable<any>{
    return this.http.delete(`${this.url}/${id}`)
  }
  addEmp(payload:any):Observable<any>{
    return this.http.post(this.url,payload)
  }
  updateEmp(id:string,user:any):Observable<any>{
    return this.http.put<any>(`${this.url}/${id}`,user);
  }
}



