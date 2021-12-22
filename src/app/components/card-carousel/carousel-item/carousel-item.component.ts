import {Component, ElementRef, forwardRef, Inject, Input, OnInit} from '@angular/core';
import {CardCarouselComponent} from "../card-carousel.component";
import {DomSanitizer, SafeStyle} from "@angular/platform-browser";

const CARD_SCALE = 0.83;

@Component({
  selector: 'app-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.sass']
})
export class CarouselItemComponent implements OnInit {
  @Input() index: number = -1;

  preTranslate: number = -1;

  isAnimating: boolean = false;

  isActive: boolean = false

  inStage = false;

  styles: SafeStyle = {};

  translate: number = 0;

  scale: number = 1;

  width: number = 0;

  constructor(@Inject(forwardRef(() => CardCarouselComponent)) public root: CardCarouselComponent,
              private sanitizer: DomSanitizer,
              private el: ElementRef,) {
  }

  ngOnInit(): void {
    this.width = this.el.nativeElement.children[0].offsetWidth * 2;
    this.root.subscriber.push(() => this.update())
    this.update()
  }

  update() {
    this.updateStyles(this.index);
    this.updateActive();
  }

  updateActive(): void {
    const isActive: boolean = this.root.model === this.index
    if (this.isActive !== isActive) {
      this.isActive = isActive
    }
  }

  calcCardTranslate(index: number, activeIndex: number) {
    const parentWidth = this.width;
    if (this.inStage) {
      return parentWidth * ((2 - CARD_SCALE) * (index - activeIndex) + 1) / 4;
    } else if (index < activeIndex) {
      return -(1 + CARD_SCALE) * parentWidth / 4;
    } else {
      return (3 + CARD_SCALE) * parentWidth / 4;
    }
  }

  processIndex(index: number, activeIndex: number, length: number) {
    if (activeIndex === 0 && index === length - 1) {
      return -1;
    } else if (activeIndex === length - 1 && index === 0) {
      return length;
    } else if (index < activeIndex - 1 && activeIndex - index >= length / 2) {
      return length + 1;
    } else if (index > activeIndex + 1 && index - activeIndex >= length / 2) {
      return -2;
    }
    return index;
  }

  updateStyles(index: number): void {
    const activeIndex = this.root.model;
    const length = this.root.slideContents?.length || 0;
    if (index !== activeIndex && length > 2) {
      index = this.processIndex(index, activeIndex, length);
    }
    this.inStage = Math.round(Math.abs(index - activeIndex)) <= 1;
    this.translate = this.calcCardTranslate(index, activeIndex);
    this.scale = this.index === activeIndex ? 1 : CARD_SCALE;
    const styles: string = `transform: translateX(${this.translate}px) scale(${this.scale})`;
    // change direction disable animation
    this.styles = this.sanitizer.bypassSecurityTrustStyle(styles)
    // save current value
    this.preTranslate = this.translate
    console.log(this.styles);
  }

  onClickItem() {
    if (this.root) {
      this.root.setActiveItem(this.index);
    }
  }
}
