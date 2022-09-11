import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { WebSocketAPI } from 'src/app/config/web-socket-api';
import { IssuesDto } from 'src/app/Dto/issues-dto';
import { IssuePoker } from 'src/app/model/issue-poker';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/_services/auth.service';
import { IssuesPokerService } from 'src/app/_services/issues-poker.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-create-issue',
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.scss']
})
export class CreateIssueComponent implements OnInit {
  errorMessage = '';
  title: string;
  url: string;
  obs: any;
  isCreateIssues = false;
  issue1: IssuePoker[] = [];
  numKey: number;
  firstKey = "PP-";
  fullKey: string;
  stompClient: any;
  @Output() isLoggedInEmitter = new EventEmitter();
  num: number[] = [];
  issuesDto= new IssuesDto();

  constructor(private fb: FormBuilder, private issuesService: IssuesPokerService, private route: ActivatedRoute) {
   
   }


  ngOnInit(): void {

    this.url = this.route.snapshot.params['id'];
    this.issuesService.getIdGameByUrl(this.url).subscribe(data => {
      this.issue1 = data.map(item => { return new IssuePoker().deserialize(item)});
      console.log("asssssssssss123", this.issue1)

      for (let i of this.issue1) {  
        const n = Number(i.key.slice(3, 10));
        this.num.push(n)
      }
      console.log("Mang Key " + this.num)
    })
    

  }

  issuesForm = this.fb.group({
    "title": ["", [Validators.required,Validators.maxLength(300)]],
  }
  )

  get IssuesForm() {
    return this.issuesForm.controls;
  }

  // Submit
  onSubmit() {
    if (this.issue1.length == 0) {
      this.issuesDto.key = this.firstKey + 1;

    } else { 
        for (var i = 0; i < this.num.length; i++) {
          if(this.numKey = this.num[i]){
            this.numKey++
           
          }
        }
       this.issuesDto.key = this.firstKey + this.numKey;
    }

    this.issuesDto.title = this.issuesForm.controls.title.value;
    this.issuesDto.url = this.route.snapshot.params['id'];


 //   this.issuesService.createIssuesPoker(this.title, this.url, this.fullKey).subscribe(
  
    this.issuesService.createIssuesPoker(this.issuesDto).subscribe(
      data => {
        console.log(data)
        this.isCreateIssues = true;
       // this.reloadPage();
       this.isLoggedInEmitter.emit();
      },
      err => {
        this.errorMessage = err.error.message;

      }
    );

    
  }


  reloadPage(): void {
    window.location.reload();
  }

  onMessageReceived(event:any) {
      console.log(event)
  }

  cancelIssue() {
    this.isLoggedInEmitter.emit();
  }

}
