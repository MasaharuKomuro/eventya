"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var StorylistRecordComponent = (function () {
    function StorylistRecordComponent() {
        this.list = [
            {
                id: 1,
                label: 'one'
            },
            {
                id: 2,
                label: 'two'
            },
            {
                id: 3,
                label: 'three'
            },
            {
                id: 4,
                label: 'four'
            },
        ];
    }
    StorylistRecordComponent.prototype.ngOnInit = function () {
    };
    return StorylistRecordComponent;
}());
__decorate([
    core_1.Input("story")
], StorylistRecordComponent.prototype, "story", void 0);
__decorate([
    core_1.Input("index")
], StorylistRecordComponent.prototype, "index", void 0);
StorylistRecordComponent = __decorate([
    core_1.Component({
        selector: '[app-organizer-storylist-record]',
        templateUrl: 'storylist-record.component.html',
        styleUrls: ['storylist-record.component.css']
    })
], StorylistRecordComponent);
exports.StorylistRecordComponent = StorylistRecordComponent;
