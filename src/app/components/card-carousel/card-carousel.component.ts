import {Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList} from '@angular/core';
import {CarouselItemComponent} from "./carousel-item/carousel-item.component";

@Component({
    selector: 'app-card-carousel',
    templateUrl: './card-carousel.component.html',
    styleUrls: ['./card-carousel.component.sass']
})
export class CardCarouselComponent implements OnInit {
    @Input() height: string = '';

    @Input() showNav = true;

    @Input() model: number = 1;

    @Output() modelChange: EventEmitter<any> = new EventEmitter<any>()

    @ContentChildren(CarouselItemComponent) slideContents: QueryList<CarouselItemComponent> | undefined

    subscriber: Function[] = []

    activeIndex = -1;

    constructor() {
    }

    ngOnInit(): void {
    }

    onClickIndicator(index: number) {
        this.setActiveItem(index);
    }

    setActiveItem(index: number) {
        if (!this.slideContents) {
            return;
        }

        const len = this.slideContents.length
        this.model = index >= len ? 0 : index < 0 ? len - 1 : index
        this.subscriber.forEach(func => func())
        this.modelChange.emit(this.model)
    }

}
