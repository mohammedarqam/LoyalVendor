import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  restId = firebase.auth().currentUser.uid;

  orderRef=firebase.database().ref("Restaurant Order/"+this.restId);
  allOrders : Array<any> = [];
  allOrdersLoaded : Array<any> = [];
  pendingOrders : Array<any> = [];

  mainArray : Array<any>=[];

  restRef= firebase.database().ref("Restaurants").child(this.restId);
  restName :string;

  OrderTypes : string = "AllUsers";

  constructor(
  public navCtrl: NavController, 
  public modalCtrl : ModalController,
  public navParams: NavParams) {
    this.getRestaurant();
    this.getOrders();
  }

  getOrders(){
    this.orderRef.once('value',itemSnapshot=>{
      let tempArray = [];
      this.pendingOrders=[];
      itemSnapshot.forEach(itemSnap =>{
        console.log(itemSnap.val())
        var temp = itemSnap.val();
        temp.key = itemSnap.key;
        tempArray.push(temp);
        
        if(itemSnap.val().Status == "Pending"){
            this.pendingOrders.push(temp);          
        }
        return false;
      });
      this.allOrders = tempArray;
      this.allOrdersLoaded = tempArray;
      this.mainArray = this.allOrders;
  });
}



initializeItems(): void {
this.allOrders = this.allOrdersLoaded;
}
getItems(searchbar) {
this.initializeItems();
let q = searchbar;
if (!q) {
  return;
}
this.allOrders = this.allOrdersLoaded.filter((v) => {
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


//   filter(){
//     switch (this.UserTypes) {
//       case "AllUsers": this.mainArray = this.allUsers;
//         break;
//       case "LoyalCustomers": this.mainArray = this.loyalUsers;
//         break;
//       case "PendingCustomers": this.mainArray = this.pendingUsers;
//         break;
    
//       default: this.mainArray = this.allUsers;
//         break;
//     }
// }
}



 
