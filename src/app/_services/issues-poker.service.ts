import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IssuesDto } from '../Dto/issues-dto';
import { IssuePoker } from '../model/issue-poker';

const POKER_API = 'http://localhost:8080/api/planning-poker/issues';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class IssuesPokerService {

  constructor(private http: HttpClient) { }
//  createIssuesPoker(title:string, url:string, key: string): Observable<any> {

  createIssuesPoker(issuesDto: IssuesDto): Observable<any> {
    return this.http.post(POKER_API + '/', {
      title: issuesDto.title,
      url: issuesDto.url,
      key:issuesDto.key
    }, httpOptions);
  }

  getIdGameByUrl(url:string): Observable<any> {
    return this.http.get(POKER_API + '/showIssue/'+ url);
  }

  deleteIssue(id:number):Observable<any>{
    return this.http.delete(POKER_API+'/'+id);
  }

  deleteAllIssue(url:string): Observable<any>{
    return this.http.delete(POKER_API+'/games/'+url);
  }
  vote(idIssue: number): Observable<any> {
    return this.http.put(POKER_API + '/vote-issue/'+idIssue, {
    }, httpOptions);
  }

  editIssue(issuePoker: IssuePoker): Observable<any> {
    return this.http.put(POKER_API + '/'+issuePoker.id, {
      
      title: issuePoker.title,
      link: issuePoker.link,
      description: issuePoker.description
    }, httpOptions);
  }
 

  getIssue(id:number): Observable<any> {
    return this.http.get(POKER_API + '/'+ id);
  }
}
