import { Component, OnInit } from '@angular/core';
import { ApiService,  User } from './../../services/api.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: User = {
    nickname: '',
    name: '',
    lastname: '',
    cellphone: '',
    country: '',
    orb: '',
    orbs: '',
    email: '',
    password: '',
    repeatpassword: ''
  };

  constructor(private apiService: ApiService, 
    private toastCtrl: ToastController, private router: Router) { }

  ngOnInit() {
  }

  register(){
    try {
      if(this.user.nickname == "" || this.user.name == "" || this.user.lastname == "" || this.user.cellphone == "" || 
      this.user.country == "" || this.user.email == "" || this.user.password == "" || 
      this.user.repeatpassword == ""){
        this.showToast('Please fill all the boxes');
      }
      else if(this.user.email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/) == null){
        this.showToast('Check if your email is correct');
      }
      else if(this.user.password != this.user.repeatpassword){
        this.showToast('Both passwords must match');
      }
      else if(this.user.password.length < 8){
        this.showToast('The password must contain at least 8 characters');
      }
      else{
        this.apiService.register(this.user.nickname, this.user.name, this.user.lastname, this.user.cellphone, 
          this.user.country, this.user.email, this.user.password).subscribe(
          data => {
            if(data["respuesta"] == "true"){
              this.router.navigateByUrl('/main');
              this.showToast('User registered successfully');
            }
            else if(data["respuesta"] == "false"){
              this.showToast('Registration failed. This user already exists, verify the data and try again');
            }
          },
          error => {
            this.showToast("Unexpected error registering. Please try later");
          }
        );
      } 
    } 
    catch (error){
      this.showToast("Unexpected error registering. Please try later.");
    }
  }

  showToast(msg) { // In this method is used to show a toast message
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

}
