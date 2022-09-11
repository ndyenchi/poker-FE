import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GameUser } from '../Dto/game-user';
import { User } from '../model/user';
import { AuthService } from '../_services/auth.service';
import { GamePokerService } from '../_services/game-poker.service';
import { TokenStorageService } from '../_services/token-storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('close') closebutton;
  @Output() onLoginSuccess = new EventEmitter<string>();

  formLogin: FormGroup;
  user: User = new User();
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  hiden: boolean = true;
  // url = localStorage.getItem('dataSource');
  url= this.route.snapshot.params['id'];


  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }
  loginForm = this.fb.group({
    "password": ["", [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*[0-9])[a-zA-Z0-9\d@$!%*?&]{8,}$")]],
    "email": ["", [Validators.required, Validators.email]],
  })

  get FormLogin() {
    return this.loginForm.controls;
  }
  doLogin() {
    this.user.email = this.loginForm.controls.email.value;
    this.user.password = this.loginForm.controls.password.value;
    this.authService.login(this.user).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        console.log(data);

        // this.reloadPage();
        //        this.router.navigate(['/home-poker/' + this.url]);

        console.log("url", this.url)
        if (this.url == null ) {

          this.router.navigate(['/create-game']);
        } else if (this.url ==localStorage.getItem('dataSource'))
        {
           this.onLoginSuccess.emit(data); }
           
        this.close();
        console.log(data)

        // console.log('url: ' + this.url);
        // if (localStorage.getItem('dataSource') != null) {

        //   // localStorage.clear();
        //   setTimeout(() => {
        //     this.reloadPage();
        //   },
        //     300);


        // } else {
        //  this.reloadPage();
        // }

      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.toastr.error("Login fail, please check your username and password.", "Login")
      }
    );
  }
  reloadPage(): void {
    window.location.reload();
  }

  close() {
    this.closebutton.nativeElement.click();
  }
}