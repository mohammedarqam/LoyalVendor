import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  restId = firebase.auth().currentUser.uid;
  restRef= firebase.database().ref("Restaurants").child(this.restId);
  restName :string;

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams) {
    this.getRestaurant();
  }





  getRestaurant(){
    this.restRef.once('value',itemSnapshot=>{
      this.restName = itemSnapshot.val().RestaurantName;
    });
    }
  
    
}
