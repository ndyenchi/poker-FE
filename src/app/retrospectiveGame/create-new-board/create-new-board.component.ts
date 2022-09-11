import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Board } from "../board";
import { RetrospectiveService } from "../retrospective.service";
// import { NgToastService } from "ng-angular-popup";



@Component({
  selector: "app-create-new-board",
  templateUrl: "./create-new-board.component.html",
  styleUrls: ["./create-new-board.component.scss"],
})
export class CreateNewBoardComponent implements OnInit {
  board: Board = new Board();
  errorMessage = '';
  myDate =new Date();
  user:any;
  Name:any;
  constructor(private fb: FormBuilder,
    private router: Router,
    private retrospectiveService: RetrospectiveService,
    private toast:ToastrService
  ) {}

  ngOnInit(): void {
    this.user=JSON.parse(sessionStorage.getItem("auth-user"));
    this.Name=this.user.displayName;

  }
  createNameForm = this.fb.group({
    "name": ["", [Validators.required,Validators.maxLength(50)]],
  },
  )
  get CreateNameForm() {
    return this.createNameForm.controls;
  }
  onSubmit() {
    this.board.name = this.createNameForm.controls.name.value;
    this.user=JSON.parse(sessionStorage.getItem("auth-user"));
    this.board.user_id=this.user.id;
    this.retrospectiveService.createBoard(this.board).subscribe(
      data => {
        this.toast.success("Board created successfully.","Retrospective")
       this.redirectMainBoard(data.message);
       console.log("a")
      },
      err => {
        this.errorMessage = err.error.message;
        console.log("b")
      }
    );
  }
  redirectMainBoard(url:string){
    this.router.navigate(["main-board",url]);
  }
  alert(){
    this.toast.error("Board created unsuccessfully.","Retrospective")
  }
}