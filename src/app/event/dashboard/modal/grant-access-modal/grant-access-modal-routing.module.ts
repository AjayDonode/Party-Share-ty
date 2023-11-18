import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrantAccessModalPage } from './grant-access-modal.page';

const routes: Routes = [
  {
    path: '',
    component: GrantAccessModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrantAccessModalPageRoutingModule {}
