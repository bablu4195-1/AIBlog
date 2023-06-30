import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  email: string = '';
  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  changePasswordForm: FormGroup = this.formBuilder.group({
    tempPassword: new FormControl('', [Validators.required]),
    changePassword: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  },{ validator: this.passwordMatchValidator });
  ForgotPasswordContainer:boolean = true;
  changedPattern:boolean = false;
  constructor(private authService: AuthService,
    private formBuilder: FormBuilder, private router: Router) { }
ngOnInit(): void {
  this.changedPattern = false;
}
  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.email = this.forgotPasswordForm.value.email || '';
      this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe(
        (res: any) => console.log(res),
        (err: any) => console.log(err)
      );
    }
    this.ForgotPasswordContainer = false;
    this.changedPattern = true
  }
  onChangedPassword(){
    this.changedPattern = true;
    if(this.changePasswordForm.valid) {
      let payload = {
        email: this.email,
        ...this.changePasswordForm.value,
      }
      this.authService.changePassword(payload).subscribe((res)=>{
       alert("password changed successfully",);
       this.router.navigate(['/login']);
      },(err)=>{
        alert(err);
        console.log(err);
      })
    } else {
      console.log("error");
    }
  }
  
  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('changePassword')?.value === formGroup.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

}
