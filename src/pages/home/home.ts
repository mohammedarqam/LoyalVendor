import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController, AlertController, MenuController, IonicPage } from 'ionic-angular';
import * as firebase from 'firebase';



@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public samples: Array<any> = [];
  totSamples: number = 0;

  restName : string;

  constructor(
  public navCtrl: NavController,
  public toastCtrl : ToastController,
  public loadingCtrl : LoadingController,
  private menuCtrl : MenuController) {
    this.menuCtrl.enable(true);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
      }else{
        this.navCtrl.setRoot("LoginPage");
      }
    });
  }
/*  getRestaurant(){
    let loading = this.loadingCtrl.create({
      content: 'Logging In...'
    });
    loading.present();

      if (this.uid) {
        firebase.database().ref("Restaurants Admins").child(this.uid).once('value',itemSnapshot=>{
          var resId = itemSnapshot.val().AssociatedRestaurant;
          firebase.database().ref("Restaurants/").child(resId).once('value',itemsnap=>{
            this.restName = itemsnap.val().RestaurantName;
            console.log(this.restName);
            return false;
          })
        }).then(()=>{
          loading.dismiss();
        })
      }
  }
*/
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      showCloseButton: false,
    });
    toast.present();


  }

}
