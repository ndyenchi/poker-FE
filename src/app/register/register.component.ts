import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from '../model/user';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  user: User=new User();
  
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  constructor(private formBuilder: FormBuilder,private authService: AuthService,private toastr: ToastrService) {
    
  }

  ngOnInit(): void {
    
  }
  registerForm=this.formBuilder.group({
      "displayName":["",[Validators.required]],
      "repassword":["",[Validators.required,Validators.minLength(8)]],
      "password":["",[Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*[0-9])[a-zA-Z0-9\d@$!%*?&]{8,}$")]],
      "email":["",[Validators.required,Validators.email]],
  },
  {
    validators: this.mustMatch('password','repassword')
  })

  get FormRegister(){
    return this.registerForm.controls;
  }
  onSubmit(): void {
    this.authService.register(this.user).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.toastr.success("Sign up successfully.","Sign Up")
        window.location.reload();
      },
      err => {
        this.errorMessage = err.error.message;
        this.toastr.error("Email already exists.","SignUp");
        this.isSignUpFailed = true;
      }
    );
  }
  mustMatch(controlName: string, matchingControlName:string){
    return (formGroup: FormGroup)=>{
      const control = formGroup.controls[controlName];
      const matchingControl=formGroup.controls[matchingControlName];
      if(matchingControl.errors && !matchingControl.errors.mustMatch){
        return null;
      }if(control.value !== matchingControl.value){
        matchingControl.setErrors({mustMatch:true});
      }else{
        matchingControl.setErrors(null);
      }
    }

  }

}