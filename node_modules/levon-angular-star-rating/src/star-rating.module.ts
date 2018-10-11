import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingConfig } from "./star-rating-config";

export { StarRatingConfig } from "./star-rating-config"

@NgModule({
  imports: [ CommonModule ],
  providers: [ StarRatingConfig ]
})
export class StarRatingModule {

}
