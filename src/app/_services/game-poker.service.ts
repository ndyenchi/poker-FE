import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const POKER_API = 'http://localhost:8080/api/planning-poker/games/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class GamePokerService {

  constructor(private http: HttpClient) { }

  createNamePoker(credentials, idUser: string): Observable<any> {
    return this.http.post(POKER_API , {
      name: credentials.name,
      idUser: idUser
    }, httpOptions);
  }

  // getNameByUrl(url:string): Observable<any> {
  //   return this.http.get(POKER_API + 'home-poker/'+ url, { responseType: 'text' });
  // }

  getNameByUrl(url: string): Observable<any> {
    return this.http.get(POKER_API  + url);
  }

  getListUserIdGame(url: string): Observable<any> {
    return this.http.get(POKER_API + 'users/games/' + url);
  }
  getListGameUserByIdGame(url: string): Observable<any> {
    return this.http.get(POKER_API + 'getGamesUserByIdGame/' + url);
  }

  chooseCart(url: string, idUsers: number, num: number, flip: boolean): Observable<any> {
    return this.http.put(POKER_API + 'chooseCard', {
      idUser: idUsers,
      url,
      num,
      flip
    }, httpOptions);
  }
  
  getUserGameByIdGameAndIdUser(url: string, idUser: number): Observable<any> {
    return this.http.get(POKER_API + 'get-game-user-by-id-game/' + url + '/' + idUser);
  }

  checkReveal(url: string): Observable<any> {
    return this.http.get(POKER_API + 'checkRevealCard/' + url );
  }

  showAverage(url: string): Observable<any> {
    return this.http.get(POKER_API + 'showAverage/' + url );
  }

  showListVoteTrue(url: string): Observable<any> {
    return this.http.get(POKER_API + 'showListVoteTrue/' + url );
  }

  findGameUserRevealByGameId(url: string): Observable<any> {
    return this.http.get(POKER_API + 'getUserRevealByGameId/' + url );
  }

  revealCard(url: string, idUsers: number, reveal: boolean): Observable<any> {
    return this.http.put(POKER_API + 'revealCard', {
      idUser: idUsers,
      url,
      reveal
    }, httpOptions);
  }
  revealEnd(url: String): Observable<any> {
    return this.http.put(POKER_API + 'revealCardEnd', { 
      url
    }, httpOptions);
  }

  invite( idUser:string, url:string): Observable<any> {
    return this.http.post(POKER_API + 'invite/'+ url+'/'+idUser, {}, httpOptions);
  }

  oldJoinGame( idUser:string, url:string): Observable<any> {
    return this.http.put(POKER_API + 'old-user', {
      "url":url,
      "idUser":idUser},
       httpOptions);
  }
}
