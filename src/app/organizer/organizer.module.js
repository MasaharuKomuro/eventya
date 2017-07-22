"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var organizer_component_1 = require("./organizer.component");
var ng2_dnd_1 = require("ng2-dnd");
var storylist_component_1 = require("./storylist/storylist.component");
var storylist_record_component_1 = require("./storylist-record/storylist-record.component");
var editlist_component_1 = require("./editlist/editlist.component");
var editlist_record_component_1 = require("./editlist-record/editlist-record.component");
var search_modal_component_1 = require("./search-modal/search-modal.component");
var channel_list_component_1 = require("./channel-list/channel-list.component");
var common_1 = require("@angular/common");
var search_condition_service_1 = require("./search-condition.service");
var http_service_1 = require("./http.service");
var http_1 = require("@angular/http");
var ng2_datetime_picker_1 = require("ng2-datetime-picker");
var angular2_fontawesome_1 = require("angular2-fontawesome");
var material_1 = require("@angular/material");
var organizer_routing_module_1 = require("./organizer-routing.module");
var modal_1 = require("ng2-bootstrap/modal");
var forms_1 = require("@angular/forms");
var datetime_picker_component_1 = require("./datetime-picker/datetime-picker.component");
var selectbox_component_1 = require("./selectbox/selectbox.component");
var tabs_1 = require("ng2-bootstrap/tabs");
var search_conditions_component_1 = require("./search-conditions/search-conditions.component");
var ng2_right_click_menu_1 = require("ng2-right-click-menu");
var topics_component_1 = require("./topics/topics.component");
var booking_menu_component_1 = require("./booking-menu/booking-menu.component");
var booking_data_service_1 = require("./booking-data.service");
var angular2_contextmenu_1 = require("angular2-contextmenu");
var toaster_component_1 = require("./toaster/toaster.component");
var angular2_toaster_1 = require("angular2-toaster");
var ng2_dropdown_treeview_1 = require("ng2-dropdown-treeview");
var channel_select_tree_view_component_1 = require("./channel-select-tree-view/channel-select-tree-view.component");
var channel_service_1 = require("./json-form/channel.service");
var channel_condition_service_1 = require("./conditions/channel-condition.service");
var OrganizerModule = (function () {
    function OrganizerModule() {
    }
    return OrganizerModule;
}());
OrganizerModule = __decorate([
    core_1.NgModule({
        imports: [
            ng2_dnd_1.DndModule.forRoot(),
            common_1.CommonModule,
            http_1.HttpModule,
            ng2_dnd_1.DndModule.forRoot(),
            ng2_datetime_picker_1.Ng2DatetimePickerModule,
            angular2_fontawesome_1.Angular2FontawesomeModule,
            material_1.MaterialModule, material_1.MdMenuModule, material_1.MdIconModule,
            organizer_routing_module_1.OrganizerRoutingModule,
            modal_1.ModalModule.forRoot(),
            forms_1.FormsModule,
            tabs_1.TabsModule,
            ng2_right_click_menu_1.ShContextMenuModule,
            angular2_contextmenu_1.ContextMenuModule.forRoot({
                useBootstrap4: true,
            }),
            angular2_toaster_1.ToasterModule,
            ng2_dropdown_treeview_1.DropdownTreeviewModule.forRoot()
        ],
        exports: [router_1.RouterModule],
        declarations: [
            organizer_component_1.OrganizerComponent,
            storylist_component_1.StorylistComponent,
            storylist_record_component_1.StorylistRecordComponent,
            organizer_component_1.OrganizerComponent,
            editlist_component_1.EditlistComponent,
            search_modal_component_1.SearchModalComponent,
            channel_list_component_1.ChannelListComponent,
            topics_component_1.TopicsComponent,
            editlist_record_component_1.EditlistRecordComponent,
            datetime_picker_component_1.DatetimePickerComponent,
            selectbox_component_1.SelectboxComponent,
            search_conditions_component_1.SearchConditionsComponent,
            booking_menu_component_1.BookingMenuComponent,
            toaster_component_1.ToasterComponent,
            channel_select_tree_view_component_1.ChannelSelectTreeViewComponent
        ],
        providers: [
            http_service_1.HttpService,
            search_condition_service_1.SearchConditionService,
            booking_data_service_1.BookingDataService,
            channel_service_1.ChannelService,
            channel_condition_service_1.ChannelConditionService
        ]
    })
], OrganizerModule);
exports.OrganizerModule = OrganizerModule;
