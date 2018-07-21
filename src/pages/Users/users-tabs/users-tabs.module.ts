import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsersTabsPage } from './users-tabs';

@NgModule({
  declarations: [
    UsersTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(UsersTabsPage),
  ],
})
export class UsersTabsPageModule {}
