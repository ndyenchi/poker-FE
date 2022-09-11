import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Board } from "../board";
import { RetrospectiveService } from "../retrospective.service";

@Component({
  selector: "app-home-page-retrospective",
  templateUrl: "./home-page-retrospective.component.html",
  styleUrls: ["./home-page-retrospective.component.scss"],
})
export class HomePageRetrospectiveComponent implements OnInit {
  boards!: Board[];
  id: string;
  userid:number;
  boardsByUserID!: Board[];
  user:any;
  Name:any;
  constructor(
    private router: Router,
    private boardSerivce: RetrospectiveService
  ) {}
  ngOnInit(): void {
    this.getAllBoardByUserID();
    this.user=JSON.parse(sessionStorage.getItem("auth-user"));
    this.Name=this.user.displayName;
  }
  redirecSelectTemlate() {
    this.router.navigate(["/select-template"]);
  }

  getAllBoardByUserID() {
    this.user=JSON.parse(sessionStorage.getItem("auth-user"));
    this.userid=this.user.id;
    this.boardSerivce.getAllBoardByUserId(this.userid).subscribe((data) => {
      this.boardsByUserID=data;
      console.log("H2"+data);
    },
    err=>{
      console.log("H1"+err);
    });
  }
  redirectBoardDetail(url:string) {
    this.router.navigate(["main-board",url]);
  }
}