import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const AUTH_API = 'http://localhost:8080/api/retrospective/boards';
const AUTH_API_GETALL="http://localhost:8080/api/retrospective/getAllBoard"    //
const AUTH_API_GETALL_BY_USERID="http://localhost:8080/api/retrospective/boards/users/"
const AUTH_API_DETAIL="http://localhost:8080/api/retrospective/boards/"
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class RetrospectiveService {
  constructor(private http:HttpClient) { }
  getAllBoardByUserId(user_id:number):Observable<any>{
    return this.http.get(AUTH_API_GETALL_BY_USERID + user_id);
  }
  getAllBoard():Observable<any>{
    return this.http.get(AUTH_API_GETALL);
  }
  getBoardDetail(url:string):Observable<any>{
    return this.http.get(AUTH_API_DETAIL +url);
  }
  createBoard(board): Observable<any> {
    return this.http.post(AUTH_API , {
      name: board.name,
      user_id:board.user_id
    }, httpOptions);
  }
}
