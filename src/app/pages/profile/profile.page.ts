import { Component, OnInit } from '@angular/core';
import { ApiService,  User } from './../../services/api.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

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
      if(this.nickname == "" && this.nickname == null){
        this.router.navigateByUrl('/main');
        this.showToast('See you soon!');
      }
      else{
        this.searchUser();
      }
    });
  }

  ionViewWillEnter() {
    this.storage.get('nickname').then((val) => {
      this.nickname = val;
      if(this.nickname == "" && this.nickname == null){
        this.router.navigateByUrl('/main');
        this.showToast('See you soon!');
      }
      else{
        this.searchUser();
      }
    });
  }

  searchUser(){
    try{
      this.apiService.searchUser(this.nickname).subscribe(
        data => {
          if(data['respuesta'] == 'false'){
            this.showToast("Unexpected error seeing your profile. Please try again later");
          }
          else{
            this.user.nickname = data['customer'].nickname;
            this.user.name = data['customer'].name;
            this.user.lastname = data['customer'].lastname;
            this.user.cellphone = data['customer'].cellphone;
            this.user.email = data['customer'].email;
          }
        },
        error => {
          this.showToast("Unexpected error editing profile. Please try again later");
        }
      );
    }
    catch (error){
      this.showToast("Unexpected error seeing your profile. Please try again later");
    }
  }

  editProfile(){
    try{
      if(this.user.name == "" || this.user.lastname == "" || this.user.cellphone == ""){
        this.showToast('Please fill all the boxes');
      }
      else{
        if(this.user.password == "" && this.user.repeatpassword == ""){
          this.apiService.editProfile(this.user.email, this.user.name, this.user.lastname, this.user.cellphone
            ,'').subscribe(
            data => {
              if(data['respuesta'] == 'true'){
                this.router.navigateByUrl('/home');
                this.showToast('Your profile was updated correctly');
              }
              else{
                this.showToast("Unexpected error editing profile. Please try later");
              }
            },
            error => {
              this.showToast("Unexpected error editing profile. Please try later");
            }
          );
        }
        else if(this.user.password != "" || this.user.repeatpassword != ""){
          if(this.user.password != this.user.repeatpassword){
            this.showToast('Both passwords must match');
          }
          else if(this.user.password.length < 8){
            this.showToast('Password must contain at least 8 characters');
          }
          else{
            this.apiService.editProfile(this.user.email, this.user.name, this.user.lastname, this.user.cellphone, 
              this.user.password).subscribe(
              data => {
                if(data['respuesta'] == 'true'){
                  this.router.navigateByUrl('/home');
                  this.showToast('Your profile was updated correctly');
                }
                else{
                  this.showToast("Unexpected error editing profile. Please try later");
                }
              },
              error => {
                this.showToast("Unexpected error editing profile. Please try later");
              }
            );
          }
        }     
      }
    }
    catch (error){
      this.showToast("Unexpected error seeing your profile. Please try again later");
    }
  }

  showToast(msg) { // In this method is used to show a toast message
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

}
