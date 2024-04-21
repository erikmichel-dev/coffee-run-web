import { Component, ElementRef, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { Coffee } from 'src/app/shared/models/coffee';
import { BrewerService } from 'src/app/shared/services/brewer.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { FilterOptions } from 'src/app/shared/enums/filter-options';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent {
  @ViewChildren('deckCards') deckCards!: QueryList<ElementRef>
  public collectedCardDeck$: Observable<Coffee[]> | undefined;
  public active = 0;
  public filterOption = 0;
  public filterOptionsArray: FilterOptions[] = [
    FilterOptions.Name,
    FilterOptions.Cost,
    FilterOptions.Tier,
    FilterOptions.Origin
  ];

  private _unsubscribe = new Subject<void>();

  constructor(
    private renderer2: Renderer2,
    private _brewerService: BrewerService) { }

  ngOnInit(): void {
    this.collectedCardDeck$ = this._brewerService.collectedCardDeck$;
    this.collectedCardDeck$
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(() => { 
        setTimeout(() => this.loadDeck(), 500); 
      });
  }

  loadDeck(): void {
    const cards = this.deckCards;
    if (cards.length === 0) return;
    let featuredCard = cards.get(this.active)?.nativeElement;
    this.renderer2.setStyle(featuredCard, 'transform', 'none');
    this.renderer2.setStyle(featuredCard, 'zIndex', '4');
    this.renderer2.setStyle(featuredCard, 'filter', 'none');
    this.renderer2.setStyle(featuredCard, 'opacity', '1');

    let pos = 0;
    let displaceIncrement = 0.6;
    let scaleIncrement = 1;
    for (var i = this.active + 1; i < cards.length; i++) {
      pos++;
      displaceIncrement = displaceIncrement + 0.08
      scaleIncrement = scaleIncrement + 0.05

      this.renderer2.setStyle(cards.get(i)?.nativeElement, 'transform', `translateX(${100 * pos / displaceIncrement}px) scale(${1 - 0.2 * pos / scaleIncrement}) perspective(16px) rotateY(-1deg)`);
      this.renderer2.setStyle(cards.get(i)?.nativeElement, 'z-index', -pos + 4);
      this.renderer2.setStyle(cards.get(i)?.nativeElement, 'filter', `blur(${pos}px)`);
      this.renderer2.setStyle(cards.get(i)?.nativeElement, 'opacity', pos > 4 ? 0 : 1);
    }
    pos = 0;
    displaceIncrement = 0.6;
    scaleIncrement = 1;
    for (var i = (this.active - 1); i >= 0; i--) {
      pos++;
      displaceIncrement = displaceIncrement + 0.08
      scaleIncrement = scaleIncrement + 0.05

      this.renderer2.setStyle(cards.get(i)?.nativeElement, 'transform', `translateX(${-100 * pos / displaceIncrement}px) scale(${1 - 0.2 * pos / scaleIncrement}) perspective(16px) rotateY(1deg)`);
      this.renderer2.setStyle(cards.get(i)?.nativeElement, 'z-index', -pos + 4);
      this.renderer2.setStyle(cards.get(i)?.nativeElement, 'filter', `blur(${pos}px)`);
      this.renderer2.setStyle(cards.get(i)?.nativeElement, 'opacity', pos > 4 ? 0 : 1);
    }
  }

  selectCard(number: number): void {
    this.active = number;
    this.loadDeck();
  }

  orderDeckBy(): void {
    const cards = [...this.deckCards];
    if (cards.length === 0) return;
    cards.forEach((card) => {
      this.renderer2.setStyle(card.nativeElement, 'transform', 'none');
      this.renderer2.setStyle(card.nativeElement, 'scale', 1);
      this.renderer2.setStyle(card.nativeElement, 'perspective', 'none');
      this.renderer2.setStyle(card.nativeElement, 'rotateY', '0deg');
      this.renderer2.setStyle(card.nativeElement, 'filter', `blur(0px)`);
    })
    this.filterOption = (this.filterOption + 1) > 3 ? 0 : this.filterOption + 1;
    this.active = this._brewerService.orderDeckBy(this.filterOptionsArray[this.filterOption], this.active);
    setTimeout(() => this.loadDeck(), 500);
  }
}
