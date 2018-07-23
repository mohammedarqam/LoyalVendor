import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  restId = firebase.auth().currentUser.uid;

  menuRef = firebase.database().ref("Menus/").child(this.restId);
  menuItems : Array<any> = [];
  menuItemsloaded : Array<any> = [];

  restRef= firebase.database().ref("Restaurants").child(this.restId);
  restName :string;


  constructor(
  public navCtrl: NavController,
  public toastCtrl : ToastController, 
  public alertCtrl : AlertController,
  public navParams: NavParams) {
    this.getMenuItems();
    this.getRestaurant();
  }


  addItem() {
    let alert = this.alertCtrl.create({
      title: 'Add Menu Item',
      inputs: [
        {
          name: 'Name',
          placeholder: 'Menu Item Name',
          type :'text'
        },
        {
          name: 'Price',
          placeholder: 'Price of the Item',
          type: 'number'
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
          text: 'Add Item',
          handler: data => {
            if (data.Name&&data.Price) {
              this.sendItem(data.Name,data.Price)              
            } else {
              this.presentToast("Cancelled");
            }
          }
        }
      ]
    });
    alert.present();
  }







getMenuItems(){
  this.menuRef.once('value',itemSnapshot=>{
    let tempArray = [];
    itemSnapshot.forEach(itemSnap =>{
      var temp = itemSnap.val();
      temp.key = itemSnap.key;
      tempArray.push(temp);
      tempArray.reverse();
      return false;
    });
    this.menuItems = tempArray;
    this.menuItemsloaded = tempArray;
});
}


  sendItem(name,price){
    this.menuRef.push({
      Name : name,
      Price : price,
      Ordered : 0,
      Time : moment().format()
    }).then(()=>{
      this.getMenuItems();
      this.presentToast("Menu Item Added");
    })

  }


  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      showCloseButton: false,
    });
    toast.present();
}
initializeItems(): void {
  this.menuItems = this.menuItemsloaded;
}
getItems(searchbar) {
  this.initializeItems();
  let q = searchbar;
  if (!q) {
    return;
  }
  this.menuItems = this.menuItems.filter((v) => {
    if(v.Name && q) {
      if (v.Name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    }
  });
}

getRestaurant(){
  this.restRef.once('value',itemSnapshot=>{
    this.restName = itemSnapshot.val().RestaurantName;
  });
  }


}
