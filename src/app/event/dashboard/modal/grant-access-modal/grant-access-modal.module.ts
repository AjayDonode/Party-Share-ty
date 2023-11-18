import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GrantAccessModalPageRoutingModule } from './grant-access-modal-routing.module';

import { GrantAccessModalPage } from './grant-access-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GrantAccessModalPageRoutingModule
  ],
  declarations: [GrantAccessModalPage]
})
export class GrantAccessModalPageModule {}
