import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const api="http://localhost:8080/api/planning-poker/voting-history/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class VotingHistoryService {

  constructor(private http: HttpClient) { 
  }
  getVotingHistory(url:string): Observable<any> {
    return this.http.get(api + url);
  }

  save(url:string): Observable<any> {
    return this.http.put(api + url,{}, httpOptions);
  }
  
}
