import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEventPageRoutingModule } from './add-event-routing.module';

import { AddEventPage } from './add-event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddEventPageRoutingModule
  ],
  declarations: [AddEventPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AddEventPageModule {}
