import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoyalUsersPage } from './loyal-users';

@NgModule({
  declarations: [
    LoyalUsersPage,
  ],
  imports: [
    IonicPageModule.forChild(LoyalUsersPage),
  ],
})
export class LoyalUsersPageModule {}
