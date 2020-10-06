import { Component, OnInit } from '@angular/core';
import { ApiService,  User } from './../../services/api.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

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

  nickname: string;

  constructor(private apiService: ApiService, 
    private toastCtrl: ToastController, private router: Router,
    private storage: Storage) { }

  ngOnInit() {
    this.storage.get('nickname').then((val) => {
      this.nickname = val;
      if(this.nickname != "" && this.nickname != null){
        this.router.navigateByUrl('/home');
        this.showToast('Welcome to PrizeBox!');
      }
    });
  }

  ionViewWillEnter() {
    this.storage.get('nickname').then((val) => {
      this.nickname = val;
      if(this.nickname != "" && this.nickname != null){
        this.router.navigateByUrl('/home');
        this.showToast('Welcome to PrizeBox!');
      }
    });
  }

  login(){
    try {
      if(this.user.nickname == "" || this.user.password == "") {
        this.showToast('Please fill all the boxes');
      }
      else if(this.user.password.length < 8){
        this.showToast('The password must contain at least 8 characters');
      }
      else{
        this.apiService.login(this.user.nickname, this.user.password).subscribe(
          data => {
            if(data['respuesta'] == "true"){
              this.storage.set('nickname', this.user.nickname);
              this.router.navigateByUrl('/home');
              this.showToast('Welcome to PrizeBox!');
            }
            else if(data['respuesta'] == "false") {
              this.showToast('Error in logging in. Verify the data and try again');
            }
          },
          error => {
            this.showToast("Unexpected error logging in. Please try later");
          }
        );
      }
    }
    catch (error){
      this.showToast("Unexpected error logging in. Please try later");
    }
  }

  showToast(msg) { // In this method is used to show a toast message
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

}
