
// module
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DndModule } from 'ng2-dnd';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';
import { Angular2FontawesomeModule } from 'angular2-fontawesome';
import { MdCheckboxModule, MdMenuModule, MdIconModule, MdRadioModule } from '@angular/material';
import { OrganizerRoutingModule } from './organizer-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ShContextMenuModule } from 'ng2-right-click-menu';
import { ContextMenuModule } from 'angular2-contextmenu';
import { ToasterModule } from 'angular2-toaster';
import { DropdownTreeviewModule } from 'ng2-dropdown-treeview';
import { LaddaModule } from 'angular2-ladda';

// Component
import { OrganizerComponent } from './organizer.component';
import { StorylistComponent } from './storylist/storylist.component';
import { StorylistRecordComponent } from './storylist-record/storylist-record.component';
import { EditlistComponent} from './editlist/editlist.component';
import { SearchModalComponent } from './search-modal/search-modal.component';
import { ChannelListComponent } from './channel-list/channel-list.component';
import { DatetimePickerComponent } from './datetime-picker/datetime-picker.component';
import { SelectboxComponent } from './selectbox/selectbox.component';
import { SearchConditionsComponent } from './search-conditions/search-conditions.component';
import { BookingMenuComponent } from './booking-menu/booking-menu.component';
import { ToasterComponent } from './toaster/toaster.component';
import { ChannelSelectTreeViewComponent } from './channel-select-tree-view/channel-select-tree-view.component';
import { TagSelectTreeViewComponent } from './tag-select-tree-view/tag-select-tree-view.component';
import { SiteSelectModalComponent } from './site-select-modal/site-select-modal.component';

// Service
import { BookingDataService } from './booking-menu/booking-data.service';
import { ChannelConditionService } from './conditions/channel-condition.service';
import { TagConditionService } from './conditions/tag-condition.service';
import { SearchConditionService } from './search-conditions/search-condition.service';
import { HttpService } from '../common/service/http.service';
import {RegistryService} from './registry/registry.service';
import { StoryDetailModalComponent } from './story-detail-modal/story-detail-modal.component';


@NgModule({
  imports: [
    DndModule.forRoot(),
    CommonModule,
    HttpModule,
    DndModule.forRoot(),
    Ng2DatetimePickerModule,
    Angular2FontawesomeModule,
    MdCheckboxModule, MdMenuModule, MdIconModule, MdRadioModule,
    OrganizerRoutingModule,
    ModalModule.forRoot(),
    FormsModule,
    TabsModule,
    ShContextMenuModule,
    ContextMenuModule.forRoot({
      useBootstrap4: true,
    }),
    ToasterModule,
    DropdownTreeviewModule.forRoot(),
    LaddaModule
  ],
  exports: [RouterModule],
  declarations: [
    OrganizerComponent,
    StorylistComponent,
    StorylistRecordComponent,
    OrganizerComponent,
    EditlistComponent,
    SearchModalComponent,
    ChannelListComponent,
    DatetimePickerComponent,
    SelectboxComponent,
    SearchConditionsComponent,
    BookingMenuComponent,
    ToasterComponent,
    ChannelSelectTreeViewComponent,
    TagSelectTreeViewComponent,
    SiteSelectModalComponent,
    StoryDetailModalComponent
  ],
  providers: [
    HttpService,
    SearchConditionService,
    BookingDataService,
    ChannelConditionService,
    TagConditionService,
    RegistryService
  ]
})

export class OrganizerModule {}
