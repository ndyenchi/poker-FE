import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private baseURL="http://localhost:8080/api/retrospective/comments";

  constructor(private httpClient: HttpClient) { }
  createComment(comment,discussionID): Observable<any> {
    return this.httpClient.post(this.baseURL, {
      content: comment.content,
      user_id: comment.user_id,
      discussion_id:discussionID
    }, httpOptions);
  }
}