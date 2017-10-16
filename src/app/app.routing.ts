import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { FullLayoutComponent }   from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';
import { RouletteComponent }     from './roulette/roulette.component';
import { TopComponent } from "./eventya/top/top.component";

export const routes: Routes = [
  {
    // pathの指定がなかったら、ログインページにリダイレクト
    path: '',
    redirectTo: 'top',
    pathMatch: 'full',
  },
  {
    path: 'top',
    component: TopComponent,
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
