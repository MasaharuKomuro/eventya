"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SelectboxComponent = (function () {
    function SelectboxComponent(service, sc_service) {
        this.service = service;
        this.sc_service = sc_service;
        this.option_items = [];
        this.input = sc_service.searchCondition;
    }
    SelectboxComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.doHttp("select_" + this.label.option).subscribe(function (option_items) { return _this.option_items = option_items; });
    };
    return SelectboxComponent;
}());
__decorate([
    core_1.Input("label")
], SelectboxComponent.prototype, "label", void 0);
SelectboxComponent = __decorate([
    core_1.Component({
        selector: 'app-selectbox',
        templateUrl: './selectbox.component.html',
        styleUrls: ['./selectbox.component.css']
    })
], SelectboxComponent);
exports.SelectboxComponent = SelectboxComponent;
