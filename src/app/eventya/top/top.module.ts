import { NgModule }           from '@angular/core';
import { RouterModule }       from '@angular/router';
import { CommonModule }       from '@angular/common';
import { HttpModule }         from '@angular/http';
import { FormsModule }        from '@angular/forms';
import { LaddaModule }        from 'angular2-ladda';
import { CarouselModule, ModalModule } from 'ngx-bootstrap';
import { TopComponent } from './top.component';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        LaddaModule,
        ModalModule.forRoot(),
        CarouselModule.forRoot()
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        TopComponent,
    ],
    providers: [
    ]
})

export class TopModule {}
