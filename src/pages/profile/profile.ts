import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';



@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  restId : string = firebase.auth().currentUser.uid;

  Restaurant :Array<any> = [];
  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams) {
  
    this.getRest();
  }



  getRest(){
        firebase.database().ref("Restaurants/").child(this.restId).once('value',sitem=>{
          this.Restaurant = [];
          this.Restaurant.push(sitem.val());
        })

}





}
