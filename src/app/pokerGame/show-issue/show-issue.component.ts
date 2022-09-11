import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { IssuePoker } from 'src/app/model/issue-poker';
import { IssuesPokerService } from 'src/app/_services/issues-poker.service';
import { EditIssueComponent } from '../edit-issue/edit-issue.component';



@Component({
  selector: 'app-show-issue',
  templateUrl: './show-issue.component.html',
  styleUrls: ['./show-issue.component.scss']
})

export class ShowIssueComponent implements OnInit {
  url: string;
  @Input("issues") issues:IssuePoker[] = [];
  popoverMessage = 'Bạn có chắc chắn muốn xóa Issue này !!!!';
  idDelete: number;
  element: HTMLElement;
  toggle = true;
  status = "Enable";
  @Output() isVote = new EventEmitter<number>();

  @Output() isDelete = new EventEmitter<number>();

  @Output() issue = new EventEmitter<IssuePoker>();

  constructor(private route: ActivatedRoute, 
              private issuesService: IssuesPokerService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
    // this.loadIssue();
    console.log('issues', this.issues);
  }

  // loadIssue() {
  //   this.url = this.route.snapshot.params['id'];
  //   this.issuesService.getIdGameByUrl(this.url).subscribe(data => {
  //     this.issues = data;
  //   })
  // }

  reloadPage(): void {
    window.location.reload();
  }
  delete(id: number) {
    // this.issuesService.deleteIssue(id).subscribe(result => {
    //   // this.loadIssue();
    //   this.issues = this.issues.filter(item => (item.id !== id));
    // });

    this.isDelete.emit(id);

  }
  // getIdIssue(idIssue:number) {
  //   this.id=idIssue;
  //   this.newItemEvent.emit(this.id);
  // }


  handleClickDelete(id: number) {
    this.element = document.getElementById("btnDelete-" + id) as HTMLElement;
    this.element.click();
  }

  
  enableDisableRule(id:number) {
//  if(!this.toggle){ id=-id;}
  console.log("id"+ id)
    // this.issuesService.vote(id).subscribe(result => {
    //   if (result.success) {
    //     this.issues = this.issues.map(issue => {
    //       if (issue.id === id) {
    //         issue.status = !issue.status;
    //       } else {
    //         issue.status = false;
    //       }
    //       return issue
    //     })
    //   }
    // });
   // this.issuesService.vote(id).subscribe();
   this.toggle = !this.toggle;
      this.status = this.toggle ? "Enable" : "Disable";

      this.isVote.emit(id);
  }
 
  vote(id:number){
    console.log("id"+ id);
    if(id<0) id=-id;
  //  this.issuesService.vote(id).subscribe();
    // this.toggle = !this.toggle;
    // this.status = this.toggle ? "Enable" : "Disable";
    this.isVote.emit(id);
  }

  // handleShowEditIssue(issue: IssuePoker) {
  //   this.modalService.show(EditIssueComponent, {
  //     class: "modal-dialog-centered modal-md modal-issue",
  //     // ignoreBackdropClick: true,
  //     initialState: {
  //       issue
  //     }
  //   })
  // }


  sendIssue(i: IssuePoker){
    this.issue.emit(i);
  }
}
