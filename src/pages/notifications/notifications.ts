import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';





@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  restId = firebase.auth().currentUser.uid;

  notiRef= firebase.database().ref("Restaurants/"+this.restId).child("/Notifications/");
  notificationsRead : Array<any> = [];
  notificationsUnRead : Array<any> = [];

  restRef= firebase.database().ref("Restaurants").child(this.restId);
  restName :string;


  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams) {
    this.getNoti();
    this.getRestaurant();
  }

  getNoti(){
    this.notiRef.once('value',itemSnap=>{
      itemSnap.forEach(item=>{
        this.notificationsRead = [];
        this.notificationsUnRead = [];
        var temp = item.val();
        temp.key = item.key;
        if(item.val().Read){
        this.notificationsRead.push(temp);
        }else{
          this.notificationsUnRead.push(temp);
        }
        return false;
      })
    })
  }


  read(noti){

    noti.Read = true;
    this.notiRef.child(noti.key).set(noti).then(()=>{
      
      this.getNoti();
    }) ;
  }

  getRestaurant(){
    this.restRef.once('value',itemSnapshot=>{
      this.restName = itemSnapshot.val().RestaurantName;
    });
    }
  
  
}
