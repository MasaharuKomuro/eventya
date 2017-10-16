import { NgModule }           from '@angular/core';
import { RouterModule }       from '@angular/router';
import { CommonModule }       from '@angular/common';
import { HttpModule }         from '@angular/http';
import { FormsModule }        from '@angular/forms';
import { LaddaModule }        from 'angular2-ladda';
import { TopComponent }       from './top.component';
import { AppComponent } from '../../app.component';
import { AboutComponent } from '../about/about.component';
import { BlogComponent } from '../blog/blog.component';
import { ContactComponent } from '../contact/contact.component';
import { FooterComponent } from '../common/component/footer/footer.component';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        LaddaModule
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        TopComponent,
        AboutComponent,
        BlogComponent,
        ContactComponent,
        FooterComponent
    ],
    providers: [
    ],
    bootstrap: [ AppComponent ]
})

export class TopModule {}
