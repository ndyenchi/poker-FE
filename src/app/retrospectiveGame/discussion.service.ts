import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class DiscussionService {
  private baseURL="http://localhost:8080/api/retrospective/discussions";
  private baseURL1="http://localhost:8080/api/retrospective/discussions/sortDiscussion";
  private baseURL2="http://localhost:8080/api/retrospective/discussion/vote";
  private baseURL3="http://localhost:8080/api/retrospective/discussions";
  private baseURL4="http://localhost:8080/api/retrospective/discussions";
  private baseURL5="http://localhost:8080/api/retrospective/boards";
  private baseURL6="http://localhost:8080/api/retrospective/discussion/unvote";
  constructor(private httpClient: HttpClient) {
  }
  createDiscussion(discussion, boardColunm_id): Observable<any> {
    return this.httpClient.post(this.baseURL, {
      content: discussion.content,
      user_id: discussion.user_id,
      boardColunm_id:boardColunm_id,
      numberVote: discussion.numberVote,
      numberUnvote: discussion.numberUnvote
    }, httpOptions);
  }
  deleteDiscussion( id:number):Observable<Object>{
    return this.httpClient.delete(`${this.baseURL3}/${id}`)
  }
  deleteBoard( url:String):Observable<Object>{
    return this.httpClient.delete(`${this.baseURL5}/${url}`)
  }
  editDiscussion( id:number,discussion):Observable<Object>{
    return this.httpClient.put(`${this.baseURL4}/${id}`,discussion)
  }
  dulicateDiscussion(discussion, boardColunm_id, userId?: number): Observable<any> {
    return this.httpClient.post(this.baseURL, {
      content: discussion.content,
      user_id: userId,
      boardColunm_id:boardColunm_id,
      numberVote: discussion.numberVote,
      numberUnvote: discussion.numberUnvote
    }, httpOptions);
  }
  sortDiscussion(direction:number,boardColumnId:number): Observable<any> {
    const param = new HttpParams().append('direction',String(direction)).append('boardColumnId', String(boardColumnId));
    return this.httpClient.get(this.baseURL1, {params: param});
  }
  saveVote(vote,discussionId): Observable<any> {
    return this.httpClient.post(this.baseURL2, {
      like: vote.like,
      unlike:  vote.unlike,
      discussionId:discussionId,
      userId: vote.userId,
    }, httpOptions);
  }
  saveUnVote(vote,discussionId): Observable<any> {
    return this.httpClient.post(this.baseURL6, {
      like: vote.like,
      unlike:  vote.unlike,
      discussionId:discussionId,
      userId: vote.userId,
    }, httpOptions);
  }
}
