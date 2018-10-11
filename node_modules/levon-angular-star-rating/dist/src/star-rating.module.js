"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var star_rating_config_1 = require("./star-rating-config");
var star_rating_config_2 = require("./star-rating-config");
exports.StarRatingConfig = star_rating_config_2.StarRatingConfig;
var StarRatingModule = (function () {
    function StarRatingModule() {
    }
    return StarRatingModule;
}());
StarRatingModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        providers: [star_rating_config_1.StarRatingConfig]
    })
], StarRatingModule);
exports.StarRatingModule = StarRatingModule;
//# sourceMappingURL=star-rating.module.js.map