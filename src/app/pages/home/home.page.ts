import { Component, OnInit } from '@angular/core';
import { ApiService,  User } from './../../services/api.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

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
            this.showToast("There was an error loading the information. Please try again later");
          }
          else{
            this.user.orb = data['customer'].orb;
          }
        },
        error => {
          this.showToast("There was an error loading the information. Please try again later");
        }
      );
    }
    catch (error){
      this.showToast("There was an error loading the information. Please try again later");
    }
  }
  //ARREGLAR LOS TOAST MESSAGES
  purchaseOrbs(){
    try{
      this.apiService.purchaseOrbs(this.nickname).subscribe(
        data => {
          if(data['respuesta'] == 'false'){
            this.showToast("Unexpected error seeing your profile. Please try again later");
          }
          else{
            this.user.orb = data['customer'].orb;
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

  participateRaffle(){
    try{
      this.apiService.participateRaffle(this.nickname).subscribe(
        data => {
          if(data['respuesta'] == 'false'){
            this.showToast("Unexpected error seeing your profile. Please try again later");
          }
          else{
            this.showToast("Congratz");
            this.user.orb = data['customer'].orb;
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

  showToast(msg) { // In this method is used to show a toast message
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

}
