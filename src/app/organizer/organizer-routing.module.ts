import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {OrganizerComponent} from "./organizer.component";


const routes: Routes = [
  {
    path: '',
    component: OrganizerComponent,
    data: {
      title: 'Organizer'
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class OrganizerRoutingModule {}
