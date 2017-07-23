import { NgModule }           from '@angular/core';
import { RouterModule }       from '@angular/router';
import { CommonModule }       from '@angular/common';
import { HttpModule }         from '@angular/http';
import { FormsModule }        from '@angular/forms';
import { LaddaModule }        from 'angular2-ladda';
import { RouletteComponent }  from './roulette.component';
import { BoardComponent } from './board/board.component';
import { ResultModalComponent } from './result-modal/result-modal.component';
import { ModalModule } from "ngx-bootstrap";

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        LaddaModule,
        ModalModule.forRoot(),
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        RouletteComponent,
        BoardComponent,
        ResultModalComponent
    ],
    providers: [
    ]
})

export class RouletteModule {}
