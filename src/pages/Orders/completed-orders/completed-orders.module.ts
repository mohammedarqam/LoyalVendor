import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompletedOrdersPage } from './completed-orders';

@NgModule({
  declarations: [
    CompletedOrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(CompletedOrdersPage),
  ],
})
export class CompletedOrdersPageModule {}
