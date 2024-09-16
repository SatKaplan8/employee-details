import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Euser } from '../users.models';

@Injectable({
  providedIn: 'root'
})
export class EmpServiceService {
  private url = "http://localhost:7000/users";
  constructor(private http: HttpClient) { }

  getEmp(): Observable<Euser[]> {
    return this.http.get<Euser[]>(this.url);
    
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
