import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-login-admin',
    templateUrl: './login-admin.component.html',
    styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent implements OnInit {

    constructor(private fb: FormBuilder,
                private router: Router,
                private toastr: ToastrService,) {
    }

    ngOnInit(): void {
    }

    formGroup = this.fb.group({
        'password': ['', [Validators.required,]],
        'username': ['', [Validators.required,]],
    });

    get FormGroup() {
        return this.formGroup.controls;
    }

    onsubmit() {
        let username = this.FormGroup.username.value;
        let password = this.FormGroup.password.value;
        if (username === 'admin' && password === 'admin') {
            this.toastr.success("Sign in successfully.", "Login");
            this.router.navigate(['dashboard']);
        }
        else{
            this.toastr.error("Login fail, please check your username and password.", "Login")
        }
    }
}
