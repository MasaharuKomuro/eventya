"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var storylist_component_1 = require("./storylist/storylist.component");
var OrganizerComponent = (function () {
    function OrganizerComponent(router) {
        this.router = router;
    }
    OrganizerComponent.prototype.ngOnInit = function () { };
    OrganizerComponent.prototype.onScrollStorylist = function (event) {
        this.storylistComponent.onScrollStorylist(event);
    };
    return OrganizerComponent;
}());
__decorate([
    core_1.ViewChild(storylist_component_1.StorylistComponent)
], OrganizerComponent.prototype, "storylistComponent", void 0);
OrganizerComponent = __decorate([
    core_1.Component({
        templateUrl: './organizer.component.html',
        styleUrls: ['./organizer.component.css']
    })
], OrganizerComponent);
exports.OrganizerComponent = OrganizerComponent;
