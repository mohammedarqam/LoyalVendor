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

  ConcernRef = firebase.database().ref("Loyal Concerns/").child(this.restId);
  Concerns : Array<any> = [];
  addView = false;

  constructor(
  public navCtrl: NavController, 
  public toastCtrl : ToastController,
  public navParams: NavParams) {
  this.getConcerns();
  }

  sendConcern(){
    this.ConcernRef.push({
      Concern : this.Concern,
      Description : this.Des,
      Time : moment().format(),
      Status : "Pending",
      Response  :"Pending"
    }).then(()=>{
      this.addView = false;
      this.Concern = null;
      this.Des = null
      this.presentToast("We will Get back to You");
    });
  }



  getConcerns(){
    this.ConcernRef.once('value',itemSnap=>{
      this.Concerns = [];
      itemSnap.forEach(item=>{
        var temp = item.val();
        this.Concerns.push(temp);
        return false;
      })
    })
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position : "middle",
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
