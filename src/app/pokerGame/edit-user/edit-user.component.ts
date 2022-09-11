import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserDTO } from 'src/app/Dto/userDTO';
import {ToastrService} from 'ngx-toastr';
import {ManagerService} from '../../_services/manager.service';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  @Input("user")user: UserDTO = new UserDTO();
  isInvalid: boolean ;
  obs: any;
  today: string;
  idUser: number;
  @ViewChild('closeEditUser') closeEditUser;
  constructor(private fb: FormBuilder,
              private toastr: ToastrService,
              private managerService: ManagerService,
             ) { }

  ngOnInit(): void {
    this.today = new Date().toISOString().split('T')[0];
    this.obs = JSON.parse(sessionStorage.getItem("auth-user"));
    this.idUser = this.obs.id;

  }
  userForm = this.fb.group({
    "fullName": ["", [Validators.required,Validators.maxLength(50)]],
    "displayName": ["", [Validators.required, Validators.maxLength(10)]],
    "dob":  ["", [Validators.required, Validators.pattern("")]],
    "phone":  ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
    "address":  ["", [Validators.required]],
  })

  get UserForm() {
    return this.userForm.controls;
  }

  onSubmit() {
    this.user.name= this.userForm.controls.fullName.value;
    this.user.displayName= this.userForm.controls.displayName.value;
    this.user.phone= this.userForm.controls.phone.value;
    this.user.address= this.userForm.controls.address.value;
    this.user.dob= this.userForm.controls.dob.value;

    if (this.userForm.controls.fullName.invalid || this.userForm.controls.displayName.invalid ||
        this.userForm.controls.phone.invalid || this.userForm.controls.address.invalid ||
        this.userForm.controls.dob.invalid  ) {
      this.toastr.error("UserDTO invalid.", "Account")
    }else if( this.userForm.controls.dob.value > this.today){
      this.toastr.error(" Date of Birth should not be greater than today ", "Account")
    }else{
      this.managerService.editUser(this.user, this.idUser).subscribe(data => {
            this.toastr.success("Update Account Success", "Account");
            this.close();
          },
          err => {
            this.toastr.error("fail.", "Account")
          });
    }

  }
  isShowLog(){
    console.log("hehe",this.userForm.controls)
    this.toastr.error("Please fill in the blanks", "Account Information");
  }
  close() {
    this.closeEditUser.nativeElement.click();
  }
}
