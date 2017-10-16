import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { TopComponent } from './eventya/top/top.component';
import { AboutComponent } from './eventya/about/about.component';
import { BlogComponent } from './eventya/blog/blog.component';
import { ContactComponent } from './eventya/contact/contact.component';

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
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'blog',
    component: BlogComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
