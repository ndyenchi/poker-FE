import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IssuesDto} from '../Dto/issues-dto';
import {Observable} from 'rxjs';
import {UserDTO} from '../Dto/userDTO';

const api = 'http://localhost:8080/api/managers';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<any> {
    return this.http.get(api + '/users/' + id);
  }
  editUser(user: UserDTO, id: number ): Observable<any> {
    return this.http.put(api + '/users', {
      id: id,
      displayName: user.displayName,
      email:user.email,
      name:user.name,
      dob: user.dob,
      address:user.address,
      phone:user.phone
    }, httpOptions);
  }
  getUserDetail(id: number){
    return this.http.get(api+'/users/'+id, httpOptions);
  }

  dashboard():Observable<any>{
    return this.http.get(api);
  }
  users():Observable<any>{
    return this.http.get(api+'/users');
  }p
  count():Observable<any>{
    return this.http.get(api+'/count');
  }
  month():Observable<any>{
    return this.http.get(api+'/month');
  }
  game():Observable<any>{
    return this.http.get(api+'/game');
  }

}
