
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
// import { timeStamp } from 'console';
import * as SockJS from 'sockjs-client';
import { AppComponent } from '../app.component';
import { CreateIssueComponent } from '../pokerGame/create-issue/create-issue.component';
import { HomePokerComponent } from '../pokerGame/home-poker/home-poker.component';
import { Discussion } from '../retrospectiveGame/discussion';
import { MainBoardComponent } from '../retrospectiveGame/main-board/main-board.component';

export class WebSocketAPI {
    webSocketEndPoint: string = 'http://localhost:8080/ws';
    topic: string = "/topic/greetings";
    stompClient: any;
    retroComponent: MainBoardComponent;


    constructor(retroComponent: MainBoardComponent) {
        this.retroComponent = retroComponent;
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
        return this.retroComponent.handleMessage(JSON.parse(message.body));

    }

    _sendTest(message:string) {
        console.log(message);
        this.stompClient.send("/app/test", {}, JSON.stringify(message));
    }

    _sendCreateDiscussion(discussion: Discussion, id: number, url: string){
        let data={
            "content":discussion.content,
            "user_id":discussion.user_id,
            "numberUnvote":discussion.numberUnvote,
            "numberVote":discussion.numberVote,
            "boardColunm_id":id

        }
        this.stompClient.send("/app/discussion/create",{}, JSON.stringify(data));
    }
    _sendCreateComment(comment, id: number){
        let data={
            "content":comment.content,
            "user_id":comment.user_id,
            "discussion_id":id
        }
        this.stompClient.send("/app/comment",{}, JSON.stringify(data));
    }
    
    
}