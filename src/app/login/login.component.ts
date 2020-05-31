import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Login} from '../interface/login';
import {LoginService} from './login.service';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router, private message: NzMessageService) { }
  userMap: Login = {
    username: '',
    password: ''
  };
  validateForm: FormGroup;
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.contains(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    this.login();
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  login(): void {
    if (this.userMap.username && this.userMap.password) {
      this.loginService.login(this.userMap).subscribe(res => {
        if (res.code === 0) {
          console.log('登录成功');
          this.router.navigate(['management']);
        } else {
          this.message.create('error', `${res.msg}`);
        }
      });
    }
  }

}
