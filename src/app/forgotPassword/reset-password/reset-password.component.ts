import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/model/user';
import { ForgotService } from '../forgot.service';
import { ResetPass } from '../reset-pass';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  email:string;
  hiden:boolean=true;
  resetPass:ResetPass=new ResetPass();
  checktoken:any;
  constructor(private forgotService:ForgotService
    ,private fb:FormBuilder,
    private route: ActivatedRoute,
    private toast:ToastrService
    ,private router:Router) { }

  ngOnInit(): void {
    this.email= localStorage.getItem("email");
  }
  ResetForm = this.fb.group({
    "password":["",[Validators.required,Validators.maxLength(51),Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*[0-9])[a-zA-Z0-9\d@$!%*?&]{8,}$")]],
  });

  get FormReset() {
    return this.ResetForm.controls;
  }
  onSubmit(): void {
    this.checktoken=localStorage.getItem("tokenPass");
    if(this.route.snapshot.params["id"] != this.checktoken)
    { this.resetPass.token= this.route.snapshot.params["id"];
    this.resetPass.password = this.ResetForm.controls.password.value;
    this.forgotService.resetPass(this.resetPass).subscribe(
      data => {
        this.toast.success("Password changed successfully.","Retrospective");
        this.router.navigate(["home"]);
        localStorage.removeItem("tokenPass")
        localStorage.setItem("tokenPass",this.route.snapshot.params["id"]);
      },
      err => {
        this.toast.error("This token have been used, Please try again","Retrospective")
      }
    );}
    else
    {
      this.toast.error("Password changed unsuccessfully, Please try again","Retrospective")
    }
   
  }
  unSucessly(){
    this.toast.error("Password changed unsuccessfully, Please try again","Retrospective")
  }
}
