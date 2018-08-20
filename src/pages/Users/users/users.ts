import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import * as firebase from 'firebase';




@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {

  restId = firebase.auth().currentUser.uid;

  usersRef=firebase.database().ref("Restaurants LoyalUsers/"+this.restId);
  allUsers : Array<any> = [];
  allUsersLoaded : Array<any> = [];
  loyalUsers : Array<any> = [];
  pendingUsers : Array<any> = [];
  mainuserRef = firebase.database().ref("Users/");
  mainArray : Array<any>=[];

  restRef= firebase.database().ref("Restaurants").child(this.restId);
  restName :string;

  UserTypes : string = "AllUsers";

  constructor(
  public navCtrl: NavController, 
  public toastCtrl : ToastController,
  public modalCtrl : ModalController,
  public navParams: NavParams) {
    this.getusers();
    this.getRestaurant();
  }

  getusers(){
    this.usersRef.once('value',itemSnapshot=>{
      let tempArray = [];
      this.pendingUsers=[];
      this.loyalUsers=[];
      itemSnapshot.forEach(itemSnap =>{
        var temp = itemSnap.val();
        firebase.database().ref("Users/").child(itemSnap.key).once('value',go=>{
          temp.Name = go.val().Name;
        })
        temp.key = itemSnap.key;
        tempArray.push(temp);
        console.log(temp);
        if(itemSnap.val().Loyalty == "Pending"){
            this.pendingUsers.push(temp);          
        }
        if(itemSnap.val().Loyalty == "Loyal"){
            this.loyalUsers.push(temp);          
        }
        return false;
      });
      this.allUsers = tempArray;
      this.allUsersLoaded = tempArray;
      this.mainArray = this.allUsers;
  });
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
this.allUsers = this.allUsersLoaded;
}
getItems(searchbar) {
this.initializeItems();
let q = searchbar;
if (!q) {
  return;
}
this.allUsers = this.allUsers.filter((v) => {
  if(v.Name && q) {
    if (v.Name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
      return true;
    }
    return false;
  }
});
}


getUserDetails(user){
  let profileModal = this.modalCtrl.create("UserDetailsPage", { user: user });
  profileModal.present();

}

getRestaurant(){
  this.restRef.once('value',itemSnapshot=>{
    this.restName = itemSnapshot.val().RestaurantName;
  });
  }


  filter(){
    switch (this.UserTypes) {
      case "AllUsers": this.mainArray = this.allUsers;
        break;
      case "LoyalCustomers": this.mainArray = this.loyalUsers;
        break;
      case "PendingCustomers": this.mainArray = this.pendingUsers;
        break;
    
      default: this.mainArray = this.allUsers;
        break;
    }
}
}