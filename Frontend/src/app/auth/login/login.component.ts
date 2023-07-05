import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  errorMessage:any = '';
  token:any;
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  
  onSubmit() {
    if (this.loginForm.valid) {
      // perform authentication...
      this.authService.login(this.loginForm.value).subscribe((res)=>{
        console.log(res);
        localStorage.setItem('token',res.token);
        localStorage.setItem('username',res.username);
        localStorage.setItem('user_id',res.id);
        this.token = res.token;
        this.router.navigate(['/post/post']);
      },(err)=>{
        alert( "Error, Please try again" );
        console.log(err);
      });
    } else {
     this.errorMessage = "Email or Password Incorrect";
    }
  }
}
