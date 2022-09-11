import { Injectable } from '@angular/core';
import { HomePokerComponent } from '../pokerGame/home-poker/home-poker.component';


import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { AppComponent } from '../app.component';
import { CreateIssueComponent } from '../pokerGame/create-issue/create-issue.component';
import { IssuePoker } from '../model/issue-poker';
import { IssuesDto } from '../Dto/issues-dto';


@Injectable({
    providedIn: 'root'
})
export class WebSocketServiceService {

    webSocketEndPoint: string = 'http://localhost:8080/ws';
    topic: string = "/topic/greetings";
    stompClient: any;
    pokerGameComponent: HomePokerComponent;


    constructor(pokerGameComponent: HomePokerComponent) {
        this.pokerGameComponent = pokerGameComponent;
    }
    _connect() {
        console.log("Initialize WebSocket Connection");
        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;
        
        _this.stompClient.connect({}, function (_frame: any) {
            _this.stompClient.subscribe(_this.topic, function (sdkEvent: any) {
                _this.onMessageReceived(sdkEvent);
            });
            //_this.stompClient.reconnect_delay = 2000;
        }, this.errorCallBack);
        
    };

    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    // on error, schedule a reconnection attempt
    errorCallBack(error: any) {
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            this._connect();
        }, 5000);
    }

    /**
    * Send message to sever via web socket
    * @param {*} message 
    */
    _send(message: any) {
        console.log("calling logout api via web socket");
        this.stompClient.send("/app/hello", {}, JSON.stringify(message));
    }

    onMessageReceived(message: any) {
        console.log("Message Recieved from Server :: ", JSON.parse(message.body));

        return this.pokerGameComponent.handleMessage(JSON.parse(message.body));

    }

    // _sendIssue(message:IssuePoker) {
    //     console.log(message);
    //     this.stompClient.send("/app/test", {}, JSON.stringify(message));
    // }

    _sendChooseCard(url: string, idUser: number, num: number, flip: boolean) {
        let data = {
            "url": url,
            "idUser": idUser,
            "num": num,
            "flip": flip
        }
        console.log(url);
        console.log(idUser);
        console.log(num);
        console.log(flip);

        this.stompClient.send("/app/choose-card", {}, JSON.stringify(data));
    }


    _sendRevealCard(url: string, idUser: number) {
        let data = {
            "idUser": idUser,
            "url": url,
            "reveal": true
        }
        this.stompClient.send("/app/reveal-card", {}, JSON.stringify(data));
    }
    _sendRevealCardEnd(url: string) {
        let data = {
            "url": url,
        }
        this.stompClient.send("/app/reveal-end", {}, JSON.stringify(data));
    }
    _sendIssue(url: string) {
        let data = { "url": url, }
        this.stompClient.send("/app/issues", {}, JSON.stringify(data));
    }

    _sendInvite(url: string, idUser: number) {
        let data = {
            "url": url,
            "idUser": idUser
        };
        this.stompClient.send("/app/invite", {}, JSON.stringify(data));
    }
    _sendVoteIssue(id: number,url: string) {
        let data = {
            "url": url,
            "idUser": id
            
        };
        this.stompClient.send("/app/issues/vote", {}, JSON.stringify(data));
    }

    _sendOutGame(id: number,url: string) {
        let data = {
            "url": url,
            "idUser": id
            
        };
        this.stompClient.send("/app/out-game", {}, JSON.stringify(data));
    }
    _sendDeleteAllIssue(url:string){
        let data = { "url": url, }
        this.stompClient.send("/app/issues/games/delete", {}, JSON.stringify(data));
    }

    _sendDeleteIssue(id: number, url:string){
        let data = { "idUser": id,"url": url }
        this.stompClient.send("/app/issues/delete", {}, JSON.stringify(data));
    }
    _sendEditIssue( issue: IssuePoker){
        let data = { 
            "id":issue.id,
            "key": issue.key,
            "title": issue.title,
            "description":issue.description ,
            "link":issue.link }
        this.stompClient.send("/app/issues/edit", {}, JSON.stringify(data));
    }
    _sendJoinGame(id: number, url: string){
        let data = { 
            "idUser": id,
            "url": url }
        this.stompClient.send("/app/join-game", {}, JSON.stringify(data));
    }
}
