import { Component } from '@angular/core';
import { WebSocketAPI } from './config/web-socket-api';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { IssuePoker } from './model/issue-poker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // handleMessage(arg0: string) {
  //     throw new Error('Method not implemented.');
  // }
  title = 'retro';





  ngOnInit() {
   
  }

  constructor() {}

}
