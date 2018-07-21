import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import * as firebase from 'firebase';
import { MenuPage } from '../pages/Menu/menu/menu';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = "LoginPage";
  activePage: any;


  pages: Array<{ title: string, component: any, icon: any }>;

  constructor(public platform: Platform,public toastCtrl : ToastController) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: "HomePage", icon: "home" },
      { title: 'Menu', component: "MenuPage", icon: "md-paper" },


    ];
    this.activePage = this.pages[0];

  }

  initializeApp() {
    this.platform.ready().then(() => {
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
    this.activePage = page;

  }
  checkActive(page) {
    return page == this.activePage;
  }

  signOut() {
    firebase.auth().signOut().then(() => {
      this.nav.setRoot("LoginPage");
      this.presentToast("Signing Out");
    }).catch((error) => {
      console.log(error.message);
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

}
