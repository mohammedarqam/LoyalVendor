import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';




@IonicPage()
@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html',
})
export class UserDetailsPage {

  user = this.navParams.get("user");
  key = this.user.key
  
  userRef = firebase.database().ref("Users/").child(this.key);
  userA : Array<any>=[];



  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams) {
    this.getUser();
  }

  getUser(){
    this.userRef.once('value',itemSnapshot=>{
      this.userA = [];
      this.userA.push(itemSnapshot.val());
    })
  }







  done(){
    this.navCtrl.pop();
  }
  
}
