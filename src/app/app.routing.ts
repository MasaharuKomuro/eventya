import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { TopComponent } from './eventya/top/top.component';
import { AboutComponent } from './eventya/about/about.component';
import { BlogComponent } from './eventya/blog/blog.component';
import { ContactComponent } from './eventya/contact/contact.component';
import { GamesComponent } from "./eventya/games/games.component";
import { BingoDetailComponent } from "./eventya/bingo-detail/bingo-detail.component";

export const routes: Routes = [
  {
    // pathの指定がなかったら、ログインページにリダイレクト
    path: '',
    redirectTo: 'top',
    pathMatch: 'full',
  },
  {
    path: 'top',
    pathMatch: 'full',
    component: TopComponent,
  },
  {
    path: 'about',
    pathMatch: 'full',
    component: AboutComponent,
  },
  {
    path: 'games',
    pathMatch: 'full',
    component: GamesComponent,
  },
  {
    path: 'games/bingo',
    pathMatch: 'full',
    component: BingoDetailComponent,
  },
  {
    path: 'blog',
    pathMatch: 'full',
    component: BlogComponent,
  },
  {
    path: 'contact',
    pathMatch: 'full',
    component: ContactComponent,
  },
  {
    path: '**',
    redirectTo: 'top',
  }
];

@NgModule({
  imports: [ RouterModule.forRoot( routes ) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
