import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userLogged!: any;
  isLoggedIn=false;
  displayName:string;
  currentUser: any;
  constructor(private router: Router,private token:TokenStorageService ) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
   this.checkUser();
 
  }
  gotoRegister(){
    this.router.navigate(['/register'])
  }
  gotoGameRetro(){
    this.router.navigate(['/home-retrospective'])
  }
  checkUser(){
    this.isLoggedIn = !!this.token.getToken();
  }
  getDisplayName(){
    this.displayName=this.token.getUser().displayName;
  }
  signOut(){
    // this.token.signOut();
    // window.location.reload();
    localStorage.clear();
    this.token.signOut();
    console.log("adadada");
    setTimeout(() => {

       window.location.reload();
    },
      300);
  }
}
