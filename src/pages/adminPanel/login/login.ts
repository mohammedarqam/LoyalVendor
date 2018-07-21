import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, LoadingController, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  lemail: string;
  lpass: string;
  
  constructor(
    public navCtrl: NavController,
    private menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
  ) {
    this.menuCtrl.enable(false);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.navCtrl.setRoot("HomePage")
      }else{

      }
    });
  }


  login() {
    let loading = this.loadingCtrl.create({
      content: 'Logging In...'
    });
    loading.present();

    firebase.auth().signInWithEmailAndPassword(this.lemail, this.lpass).catch(function (error) {
      alert(error.message);
    }).then(()=>{
      this.presentToast("Logged In");
    });
  loading.dismiss();
  }


  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      showCloseButton: false,
    });
    toast.present();
  }

}
