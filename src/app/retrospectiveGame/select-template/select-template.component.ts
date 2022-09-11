import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-select-template",
  templateUrl: "./select-template.component.html",
  styleUrls: ["./select-template.component.scss"],
})
export class SelectTemplateComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  
  createNewBoard() {
    this.router.navigate(["/create-new-board"]);
  }
}
