import { NgModule }           from '@angular/core';
import { RouterModule }       from '@angular/router';
import { CommonModule }       from '@angular/common';
import { HttpModule }         from '@angular/http';
import { FormsModule }        from '@angular/forms';
import { LaddaModule }        from 'angular2-ladda';
import { RouletteComponent }  from './roulette.component';

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
        RouletteComponent
    ],
    providers: [
    ]
})

export class RouletteModule {}
