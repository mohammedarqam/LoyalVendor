import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactLoyalPage } from './contact-loyal';

@NgModule({
  declarations: [
    ContactLoyalPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactLoyalPage),
  ],
})
export class ContactLoyalPageModule {}
