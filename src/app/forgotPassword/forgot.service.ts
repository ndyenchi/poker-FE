import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const AUTH_API = 'http://localhost:8080/api/user/sendMail';
const AUTH_API_RESET_PASS = 'http://localhost:8080/api/forgot/password/resetPassword';
@Injectable({
  providedIn: 'root'
})
export class ForgotService {

  constructor(private http:HttpClient) { }
  forgotPass(email){
    return this.http.post(AUTH_API, {
      emailTo: email.emailTo
    }, httpOptions);
  }
  resetPass(ResetPass){
    return this.http.post(AUTH_API_RESET_PASS, {
      token: ResetPass.token,
      password:ResetPass.password,
    }, httpOptions);
  }
}
