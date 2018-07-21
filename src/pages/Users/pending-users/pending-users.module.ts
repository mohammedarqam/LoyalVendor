import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PendingUsersPage } from './pending-users';

@NgModule({
  declarations: [
    PendingUsersPage,
  ],
  imports: [
    IonicPageModule.forChild(PendingUsersPage),
  ],
})
export class PendingUsersPageModule {}
