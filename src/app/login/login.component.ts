import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin } from '../shared/interfaces/loginI';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router

  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm(){
    this.loginForm = this.formBuilder.group({
      userName:[null,[Validators.required,Validators.email]],
      password:[null,[Validators.required]]
    })
  }

  onSubmitLoginForm(){
    if (this.loginForm.valid) {
      const formValues = this.loginForm.getRawValue();
      const body:ILogin = {
        email:formValues.userName,
        password:formValues.password
      }

      this.authService.signIn(body).subscribe(
        (success) =>{
          console.log("success",success);
          this.router.navigate(["products"]);

        },
        (error) =>{
          console.log("error",error)
        },
      );

    }else{
      this.loginForm.get("userName")?.markAsTouched();
      this.loginForm.get("password")?.markAsTouched();
    }
  }
}
