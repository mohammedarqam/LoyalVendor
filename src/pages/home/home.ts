import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController, AlertController, MenuController, IonicPage } from 'ionic-angular';
import * as firebase from 'firebase';



@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

restId = firebase.auth().currentUser.uid;
  restRef= firebase.database().ref("Restaurants").child(this.restId);
  restautant : Array<any> = [];

  usersRef=firebase.database().ref("Restaurants/"+this.restId).child("/Users/");
  totUsers: number = 0;

  menuRef=firebase.database().ref("Menus/"+this.restId);
  totmenuItems: number = 0;

  Restaurants:any = [];
  restName :string;
  uidi :string;
  totOrders : number = 0;


  constructor(
  public navCtrl: NavController,
  private menuCtrl : MenuController) {
    this.menuCtrl.enable(true);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.uidi =user.uid; 
      }else{
        this.navCtrl.setRoot("LoginPage");
      }
    });
  }

  ionViewDidEnter(){
    this.getusers();
    this.getmenu();
    this.getRestaurant();
  }


  getRestaurant(){
    this.restRef.once('value',itemSnapshot=>{
      this.restName = itemSnapshot.val().RestaurantName;
      this.totOrders = itemSnapshot.val().TotalOrders;
      this.restautant = [];
      this.restautant.push(itemSnapshot.val());
    });
    }






getusers(){
  this.usersRef.once('value',itemSnapshot=>{
    this.totUsers = itemSnapshot.numChildren();
  });}

getmenu(){
  this.menuRef.once('value',itemSnapshot=>{
    this.totmenuItems = itemSnapshot.numChildren();
  });}



}
