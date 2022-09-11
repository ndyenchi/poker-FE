import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Email } from '../email';
import { ForgotService } from '../forgot.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  email:Email=new Email();
  emailSession!:any;
  constructor(private fb: FormBuilder,
    private forgotSerivce:ForgotService,
    private router:Router,
    private toast:ToastrService) { }

  ngOnInit(): void {
  }
  forgotForm = this.fb.group({
    "emailTo": ["", [Validators.required, Validators.email]],
  });

  get FormForgot() {
    return this.forgotForm.controls;
  }
  forgotPass() {
    this.email.emailTo = this.forgotForm.controls.emailTo.value;
    this.forgotSerivce.forgotPass(this.email).subscribe(
      data => {
        this.toast.success("We have sent an email to"+ " " +this.email.emailTo +" "+" Check your inbox and flow the instruction" ,"Forgot password");
        console.log(data);
        this.emailSession=data;
        window.localStorage.setItem("email", this.email.emailTo);
      },
      err => {
        console.log(err);
        this.toast.error("Fail forgot password"+ " " +this.email.emailTo +" "+ "Check your email" ,"Forgot password")
      }
    );
  }
}