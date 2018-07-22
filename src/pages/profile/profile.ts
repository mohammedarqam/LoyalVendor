import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';



@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  restId : string = firebase.auth().currentUser.uid;
  uEmail : string;
  uPass : string;


  Restaurant :Array<any> = [];
  constructor(
  public navCtrl: NavController, 
  public alertCtrl : AlertController,
  public toastCtrl : ToastController,
  public loadingCtrl : LoadingController,
  public navParams: NavParams) {
  
    this.getRest();
  }


getUser(){
  
}
  


  getRest(){
        firebase.database().ref("Restaurants/").child(this.restId).once('value',sitem=>{
          this.uEmail = sitem.val().Email;
          this.uPass = sitem.val().Password;
          this.Restaurant = [];
          this.Restaurant.push(sitem.val());
        })

}






cpConfirm() {
  let alert = this.alertCtrl.create({
    title: 'Change Password',
    inputs: [
      {
        name: 'OldPass',
        placeholder: 'Enter your Current password',
        type :'password'
      },
      {
        name: 'NewPass',
        placeholder: 'Enter new password',
        type: 'password'
      },
      {
        name: 'NewPassC',
        placeholder: 'Confirm new password',
        type: 'password'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Change Password',
        handler: data => {
          if(data.OldPass == this.uPass){
            if(data.NewPass == data.NewPassC){
              this.changePass(data.NewPass);
            }else{
              this.presentToast("Passwords Don't Match")
            }
          }else{
            this.presentToast("Wrong Password Entered");
          }
        }
      }
    ]
  });
  alert.present();
}

changePass(NewPass){
  let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });

  loading.present();

  firebase.auth().currentUser.updatePassword(NewPass).then(()=>{
    firebase.database().ref("Restaurants/").child(this.restId).child("Password").set(NewPass).then(()=>{
      this.presentToast("Password Changed");
      loading.dismiss();
    })
  });

}

presentToast(msg) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 4000,
    position : "bottom",
    showCloseButton: false,
  });
  toast.present();
}


}
