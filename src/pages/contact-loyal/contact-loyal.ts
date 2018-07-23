import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';
import moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-contact-loyal',
  templateUrl: 'contact-loyal.html',
})
export class ContactLoyalPage {

  Concern : string;
  Des : string;
  restId = firebase.auth().currentUser.uid;

  ConcernRef = firebase.database().ref("Loyal Concerns/");

  Concerns : Array<any> = [];
  addView = false;
  restName : string;
  
  constructor(
  public navCtrl: NavController, 
  public toastCtrl : ToastController,
  public navParams: NavParams) {
  this.getConcerns();
  }


  sendConcern(){
    firebase.database().ref("Restaurants/").child(this.restId).once('value',itemSnapper=>{
      this.ConcernRef.push({
        Concern : this.Concern,
        Description : this.Des,
        Time : moment().format(),
        Status : "Pending",
        Response  :"Pending",
        Restaurant : this.restId,
        RestaurantName : itemSnapper.val().RestaurantName
      }).then(res=>{
        firebase.database().ref("Restaurants/").child(this.restId).child("/Concerns/").push({ ConcernId : res.key}).then(()=>{
          this.addView = false;
          this.Concern = null;
          this.Des = null
          this.presentToast("We will Get back to You");
          });
      });
      return false;
    })

  }

  


  getConcerns(){
    firebase.database().ref("Restaurants/"+this.restId).child("Concerns").once('value',itemSnapshot=>{
      this.Concerns = [];
      itemSnapshot.forEach(itemSnap =>{
          firebase.database().ref("Loyal Concerns/").child(itemSnap.val().ConcernId).once('value',items=>{
            this.Concerns.push(items.val());
            this.Concerns.reverse();
            return false;
          })
        return false;
      });
  
    })


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

showForm(){
  this.addView = true;
}
hideForm(){
  this.addView = false;
}

}
