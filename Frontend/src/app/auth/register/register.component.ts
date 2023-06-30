import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    profilePicture: [null]
  } ,{ validator: this.passwordMatchValidator });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      profilePicture: [null]
    }, { validator: this.passwordMatchValidator });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      //appending formdata
      const formData = new FormData();
      let fileInput = document.querySelector('#my-file-input') as HTMLInputElement;
      console.log(fileInput);
      Object.keys(this.signupForm.value).forEach(key => {
        if(key !== 'confirmPassword'){
          formData.append(key, this.signupForm.value[key]);
        }
      });
      // perform signup...
      if (fileInput?.files && fileInput.files.length > 0) {
        formData.append('profilePicture', fileInput.files[0]);
    }
       
      console.log(formData);
      this.authService.signup(formData).subscribe((res:any) => {
        console.log(res);
        this.router.navigate(['/login']);
      }, (err: Error) => {
        alert('Error, Please try again');
        console.log(err);
      });
    }
  }


  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password')?.value === formGroup.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }
}

