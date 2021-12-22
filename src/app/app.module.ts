import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CardCarouselComponent } from './components/card-carousel/card-carousel.component';
import { CarouselItemComponent } from './components/card-carousel/carousel-item/carousel-item.component';

@NgModule({
  declarations: [
    AppComponent,
    CardCarouselComponent,
    CarouselItemComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
