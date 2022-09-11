import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IssuePoker } from 'src/app/model/issue-poker';
import { IssuesPokerService } from 'src/app/_services/issues-poker.service';

@Component({
  selector: 'app-edit-issue',
  templateUrl: './edit-issue.component.html',
  styleUrls: ['./edit-issue.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditIssueComponent implements OnInit {

  @Input("issue") issue: IssuePoker = new IssuePoker();

  isChange: boolean = false;
  isChangeLink: boolean = false;
  isChangeDescription: boolean = false;
  link: boolean = false;
  description: boolean = false;
  @Output() issueEdit = new EventEmitter<IssuePoker>();



  constructor(
    private fb: FormBuilder,
    private issueService: IssuesPokerService,
  ) { }

  ngOnInit(): void {

    console.log("id", this.issue.id);
    console.log("id", this.issue.title);

  }


  updateContent() {
    this.isChange = !this.isChange;
    this.isChangeDescription = false;
    this.isChangeLink = false;
  }
  changeLink() {
    this.isChangeLink = !this.isChangeLink;
    this.isChangeDescription = false;
    this.isChange = false;
  }
  changeDescription() {
    this.isChangeDescription = !this.isChangeDescription;
    this.isChange = false;
    this.isChangeLink = false;
  }

  // checkForm=  this.fb.group({
  //   "title": ["", [Validators.required,Validators.maxLength(50)]],
  //   "link":["", [Validators.required,Validators.maxLength(100)]],
  //   "description": ["", [Validators.required,Validators.maxLength(300)]],
  // }
  // )
  // onSubmit(){
  //   this.issue.title=this.checkForm.controls.title.value;
  //   this.issue.link=this.checkForm.controls.link.value;
  //   this.issue.description=this.checkForm.controls.description.value;
  //   console.log("title", this.issue.title);
  // }

  saveTitle(title: string) {

    this.issue.title = title;
    console.log("title", this.issue.title);
    this.issueEdit.emit(this.issue);
  }
  saveLink(link: string) {
    console.log("link", link.substring(0, 8));
    if (link.substring(0, 8) === 'https://') {
      this.issue.link =  link;
    }else{
      this.issue.link = 'https://' + link;
    }

    this.issueEdit.emit(this.issue);
  }
  saveDescription(description: string) {
    this.issue.description = description;
    this.issueEdit.emit(this.issue);
  }

}
