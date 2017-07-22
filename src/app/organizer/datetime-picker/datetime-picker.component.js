"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ng2_datetime_picker_1 = require("ng2-datetime-picker");
var DatetimePickerComponent = (function () {
    function DatetimePickerComponent(sc_service) {
        this.input = sc_service.searchCondition;
        //DateTimePickerの表示ラベルを日本語にオーバーライドする
        ng2_datetime_picker_1.Ng2Datetime.daysOfWeek =
            [
                { fullName: '日', shortName: '日' },
                { fullName: '月', shortName: '月' },
                { fullName: '火', shortName: '火' },
                { fullName: '水', shortName: '水' },
                { fullName: '木', shortName: '木' },
                { fullName: '金', shortName: '金' },
                { fullName: '土', shortName: '土' }
            ];
        ng2_datetime_picker_1.Ng2Datetime.months =
            [
                { fullName: '1月', shortName: '1月' },
                { fullName: '2月', shortName: '2月' },
                { fullName: '3月', shortName: '3月' },
                { fullName: '4月', shortName: '4月' },
                { fullName: '5月', shortName: '5月' },
                { fullName: '6月', shortName: '6月' },
                { fullName: '7月', shortName: '7月' },
                { fullName: '8月', shortName: '8月' },
                { fullName: '9月', shortName: '9月' },
                { fullName: '10月', shortName: '10月' },
                { fullName: '11月', shortName: '11月' },
                { fullName: '12月', shortName: '12月' }
            ];
        ng2_datetime_picker_1.Ng2Datetime.locale = {
            date: '日時',
            time: '時分',
            year: '年',
            month: '月',
            day: '日',
            hour: '時',
            minute: '分',
            currentTime: "現在時刻"
        };
    }
    DatetimePickerComponent.prototype.ngOnInit = function () {
    };
    return DatetimePickerComponent;
}());
__decorate([
    core_1.Input()
], DatetimePickerComponent.prototype, "label", void 0);
DatetimePickerComponent = __decorate([
    core_1.Component({
        selector: 'app-datetime-picker',
        templateUrl: './datetime-picker.component.html',
        styleUrls: ['./datetime-picker.component.css']
    })
], DatetimePickerComponent);
exports.DatetimePickerComponent = DatetimePickerComponent;
