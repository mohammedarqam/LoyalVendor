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

  userRef = firebase.database().ref("Restaurants/"+this.restId).child("/Users/");
  allUsers : Array<any> = [];
  allUsersLoaded : Array<any> = [];
  loyalUsers : Array<any> = [];
  pendingUsers : Array<any> = [];
  mainuserRef = firebase.database().ref("Users/");

  constructor(
  public navCtrl: NavController, 
  public toastCtrl : ToastController,
  public modalCtrl : ModalController,
  public navParams: NavParams) {
    this.getusers();
  }

  getusers(){
    this.userRef.once('value',itemSnapshot=>{
      let tempArray = [];
      this.pendingUsers=[];
      this.loyalUsers=[];
      itemSnapshot.forEach(itemSnap =>{
        var temp = itemSnap.val();
        temp.key = itemSnap.key;
        tempArray.push(temp);
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

}
