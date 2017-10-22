import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy, CommonModule, PathLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';

// Routing Module
import { AppRoutingModule }      from './app.routing';
import { RouletteModule }        from './roulette/roulette.module';

// Layouts
import { FullLayoutComponent }   from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';
import { FormsModule }           from '@angular/forms';
import { TopComponent } from './eventya/top/top.component';
import { AboutComponent } from './eventya/about/about.component';
import { BlogComponent } from './eventya/blog/blog.component';
import { ContactComponent } from './eventya/contact/contact.component';
import { RegistryService } from "./eventya/common/registry.service";
import { FooterComponent } from './eventya/common/component/footer/footer.component';
import { HeaderComponent } from './eventya/common/component/header/header.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    FormsModule,
    CommonModule,
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    SimpleLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    TopComponent,
    AboutComponent,
    BlogComponent,
    ContactComponent,
    FooterComponent,
    HeaderComponent
  ],
  providers: [
    {
      provide:  LocationStrategy,
      useClass: PathLocationStrategy
    },
      RegistryService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
