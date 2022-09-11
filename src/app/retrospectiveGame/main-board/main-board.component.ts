import { Component, OnInit, TemplateRef } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { WebSocketAPI } from "src/app/config/web-socket-api";
import { Board } from "../board";
import { BoardColumn } from "../board-colunm";
import { Comment } from "../comment";
import { CommentService } from "../comment.service";
import { Discussion } from "../discussion";
import { DiscussionService } from "../discussion.service";
import { RetrospectiveService } from "../retrospective.service";
import { Vote } from "../vote";

@Component({
  selector: "app-main-board",
  templateUrl: "./main-board.component.html",
  styleUrls: ["./main-board.component.scss"],
})
export class MainBoardComponent implements OnInit {
  discussion: Discussion = new Discussion();
  vote: Vote = new Vote();
  comment: Comment = new Comment();
  discussions: Discussion[];
  createDiscussion: FormGroup
  obs: any;
  user_id: any;
  displayName: string;
  url!: string;
  board: Board = new Board();
  discussionModal: Discussion = new Discussion();
  deleteDiss!: number;
  boardColumn: BoardColumn[] = [];
  discussionId: number;
  modalRef: BsModalRef;
  displayName2: any;
  numberComment: number;
  voteNumber: any;
  popoverMessage = 'Bạn có chắc chắn muốn xóa Board này !!!!';
  cancelClicked = false;
  valueVote: boolean = false;
  myDate = new Date();
  webSocketAPI: WebSocketAPI;


  constructor(
    private route: ActivatedRoute,
    private boardSerivce: RetrospectiveService,
    private fb: FormBuilder, private discussionService: DiscussionService,
    private toastr: ToastrService,
    private commentSerivce: CommentService,
    private modalService: BsModalService,
    private router: Router
  ) { }

  discussionForm = this.fb.group({
    "content": ["", [Validators.maxLength(500)]],
  })
  commentForm = this.fb.group({
    "content": ["", [Validators.maxLength(500)]],
  })
  get FormDiscussion() {
    return this.discussionForm.controls;
  }
  get FormComment() {
    return this.commentForm.controls;
  }
  //edit form
  editDiscussionForm = this.fb.group({
    "content": ["", [Validators.maxLength(500)]],
  })
  get FormEditDiscussion() {
    return this.editDiscussionForm.controls;
  }
  //edit form
  voteForm = this.fb.group({
    "like": ["", [Validators.required]],
    "unlike": ["", [Validators.required]],
  })
  get FormVote() {
    return this.voteForm.controls;
  }
  ngOnInit(): void {

    this.webSocketAPI = new WebSocketAPI(this);
    this.connect();

    this.obs = JSON.parse(sessionStorage.getItem("auth-user"));
    this.displayName2 = this.obs.displayName
    this.getBoardDetail();
    this.voteForm.get("like")?.setValue(true);
    this.voteForm.get("unlike")?.setValue(true);
  }

  getBoardDetail() {
    this.url = this.route.snapshot.params["url"];
    this.boardSerivce.getBoardDetail(this.url).subscribe(
      data => {
        this.board = data;
        this.boardColumn = data.board_Colunms;
        this.initEditDiscussionForm(this.boardColumn);
        console.log(this.boardColumn);
        // const sort = JSON.parse(localStorage.getItem('sort'));
        // this.sortDiscussion(sort.direction, sort.index);

      }
    );
  }
  initEditDiscussionForm(boardColumn) {
    this.editDiscussionForm = new FormGroup({}) //<--create the formGroup
    for (let col of boardColumn) {
      for (let d of col.discussionList) {
        this.editDiscussionForm.addControl(d.id, new FormControl(d.content))
      }

    }
  }
  duplicate(discussion: Discussion, boardColumnId: number, indexBoardolumn: number) {
    this.discussionService.dulicateDiscussion(discussion, boardColumnId, this.obs.id).subscribe(result => {
      this.boardColumn[indexBoardolumn].discussionList.push(result);
      window.location.reload();
    });
  }
  saveDiscussion(boardColunm_id) {
    this.discussion.content = this.discussionForm.controls.content.value;
    this.obs = JSON.parse(sessionStorage.getItem("auth-user"));
    this.discussion.user_id = this.obs.id;
    this.discussionService.createDiscussion(this.discussion, boardColunm_id).subscribe(data => {
      console.log(data);
      this.toastr.success("Discussion created successfully.", "Discussion")
      window.location.reload();
    },
      error => {
        console.log(error);
      }
    )

    //  this.webSocketAPI._sendCreateDiscussion(this.discussion,boardColunm_id, this.url);
  }
  editDiscussion(id: number) {
    this.discussion.content = this.editDiscussionForm.controls[id].value;
    this.discussionService.editDiscussion(id, this.discussion).subscribe(data => {
      this.toastr.success("Discussion edit successfully.", "Discussion")
      window.location.reload();
    }),
      err => {
        this.toastr.error("Discussion edit successfully.", "Discussion")
      }
  }
  deleteDiscussion(id: number) {
    this.discussionService.deleteDiscussion(id).subscribe((data) => {
      this.toastr.success("Delete discussion successfully.", "Discussion");
      window.location.reload();
    },
      err => {
        this.toastr.error("Delete discussion unsuccessfully.", "Discussion")
      });
  }
  deleteBoard() {
    this.url = this.route.snapshot.params["url"];
    this.discussionService.deleteBoard(this.url).subscribe((data) => {
      this.toastr.success("Delete Board successfully.", "Discussion");
      this.router.navigate(["/home-retrospective"]);
      // window.location.reload();
    },
      err => {
        this.toastr.error("Delete discussion unsuccessfully.", "Discussion")
      });
  }
  onSubmit(boardColunm_id) {
    if (this.FormDiscussion.content.value.length != 0 && this.FormDiscussion.content.value.trim()) {
      this.saveDiscussion(boardColunm_id);
    } else {
      this.toastr.error("Discussion created unsuccessfully.", "Discussion")
    }
    if (this.FormDiscussion.content.value.length > 500) {
      this.toastr.error("You cannot enter more than 500 characters.", "Discussion")
    }
  }
  sortDiscussion(direction: number, index: number) {
    const sort = { direction, index };
    localStorage.setItem("sort", JSON.stringify(sort));
    switch (direction) {
      case 0:
        this.boardColumn = this.boardColumn.map((item, i) => {
          if (index === i) {
            item.discussionList.sort((a, b) => {
              return (new Date(b.createDate)).getTime() - (new Date(a.createDate)).getTime();
            })
          }
          return item;
        })
        break;
      case 1:
        this.boardColumn = this.boardColumn.map((item, i) => {
          if (index === i) {
            item.discussionList.sort((a, b) => {
              return b.numberUnvote - a.numberUnvote;
            })
          }
          return item;
        })
        break;
      case 2:
        this.boardColumn = this.boardColumn.map((item, i) => {
          console.log(index, i);
          if (index === i) {
            item.discussionList.sort((a, b) => {
              return b.numberVote - a.numberVote;
            })
          }
          return item;
        })
        break;
    }
  }
  saveVote(discussionId) {
    this.vote.like = this.voteForm.controls.like.value;
    // this.vote.unlike=this.voteForm.controls.unlike.value;
    this.valueVote = !this.valueVote;
    this.obs = JSON.parse(sessionStorage.getItem("auth-user"));
    this.vote.userId = this.obs.id;
    this.discussionService.saveVote(this.vote, discussionId).subscribe(data => {
      console.log(data);
      this.toastr.success("Discussion created successfully.", "Discussion")
      window.location.reload();
    },
      error => {
        console.log(error);
      }
    )
  }
  saveUnVote(discussionId) {
    // this.vote.like=this.voteForm.controls.like.value;
    this.vote.unlike = this.voteForm.controls.unlike.value;
    this.obs = JSON.parse(sessionStorage.getItem("auth-user"));
    this.vote.userId = this.obs.id;
    this.discussionService.saveUnVote(this.vote, discussionId).subscribe(data => {
      console.log(data);
      this.toastr.success("Discussion created successfully.", "Discussion")
      window.location.reload();
    },
      error => {
        console.log(error);
      }
    )
  }
  //
  // comment
  preview(template: TemplateRef<any>, disc: any) {
    this.discussionModal = disc;
    this.modalRef = this.modalService.show(template, { class: 'modal-md modal-dialog-centered' });
  }
  deleteDis(template: TemplateRef<any>, id: number) {
    this.deleteDiss = id;
    this.modalRef = this.modalService.show(template, { class: 'modal-md modal-dialog-centered' });
  }
  saveComment(discussionID) {
    this.obs = JSON.parse(sessionStorage.getItem("auth-user"));
    this.comment.content = this.commentForm.controls.content.value;
    this.comment.user_id = this.obs.id;
    // this.commentSerivce.createComment(this.comment,discussionID).subscribe(data =>{
    //   console.log(data);
    //   this.toastr.success("Comment created successfully.","Comment")
    //   window.location.reload();
    // },
    // error=>{
    //   console.log(error);
    // }
    // )
    this.webSocketAPI._sendCreateComment(this.comment, discussionID);
  }

  onSubmitComment(discussionID) {
    if (this.FormComment.content.value.length > 300) {
      this.toastr.error("You cannot enter more than 500 characters.", "Discussion")
    } 
    else if (this.FormComment.content.value.length != 0 && this.FormComment.content.value.trim()) {
      this.saveComment(discussionID);
      this.FormComment.content.reset();
    } 
    else {
      this.toastr.error("Discussion created unsuccessfully.", "Discussion")
    }
  }
  connect() {
    this.webSocketAPI._connect();
  }

  disconnect() {
    this.webSocketAPI._disconnect();
  }
  test() {

    this.webSocketAPI._sendTest("chichi");
  }
  handleMessage(message: any) {
    console.log("message", message);
    switch (message.body.type) {
      case "COMMENT": {
        if(message.body.data.id == this.discussionModal.id){
          this.discussionModal = message.body.data;
        console.log("comment", this.discussionModal)
        }
        
      }
    }
  }

}
