import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Coffee } from 'src/app/shared/models/coffee';
import { CoffeeCardComponent } from '../shared/coffee-card/coffee-card.component';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent {
  @ViewChildren('card') deckCards!: QueryList<ElementRef>
  public testCoffeeList: Coffee[] = [
    {
      "origin": "American",
      "cost": 28,
      "coffee_id": "15",
      "tier": "Rare",
      "description": "A zesty and crunchy coffee surprise.",
      "name": "Lemon Poppy Seed Latte"
    },
    {
      "origin": "Turkish",
      "cost": 19,
      "coffee_id": "23",
      "tier": "Uncommon",
      "description": "Spiced like a sultan's dream.",
      "name": "Turkish Delight"
    },
    {
      "origin": "American",
      "cost": 8,
      "coffee_id": "9",
      "tier": "Common",
      "description": "Coffee's chill, laid-back surfer cousin.",
      "name": "Cold Brew"
    },
    {
      "origin": "American Fusion",
      "cost": 21,
      "coffee_id": "4",
      "tier": "Uncommon",
      "description": "Cozy yet fancy rendezvous of chocolate and lavender.",
      "name": "Lavender Mocha"
    },
    {
      "origin": "American",
      "cost": 10,
      "coffee_id": "32",
      "tier": "Common",
      "description": "Sweet, snowy romance.",
      "name": "White Chocolate Mocha"
    },
    {
      "origin": "American",
      "cost": 8,
      "coffee_id": "25",
      "tier": "Common",
      "description": "Coffee's monochrome chic sophistication.",
      "name": "Black and White Coffee"
    }
  ]

  public active = 5;

  constructor(private renderer2: Renderer2) { }

  ngAfterViewInit(): void {
    this.loadDeck()
  }

  loadDeck(): void {
    const cards = this.deckCards;
    let featuredCard = cards.get(this.active)?.nativeElement;
    this.renderer2.setStyle(featuredCard, 'transform', 'none');
    this.renderer2.setStyle(featuredCard, 'zIndex', '3');
    this.renderer2.setStyle(featuredCard, 'filter', 'none');
    this.renderer2.setStyle(featuredCard, 'opacity', '1');

    let stt = 0;
    for (var i = this.active + 1; i < cards.length; i++) {
      stt++;
      this.renderer2.setStyle(cards.get(i)?.nativeElement, 'transform', `translateX(${160 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(-1deg)`);
      this.renderer2.setStyle(cards.get(i)?.nativeElement, 'z-index', -stt + 3);
      this.renderer2.setStyle(cards.get(i)?.nativeElement, 'filter', 'blur(2px)');
      this.renderer2.setStyle(cards.get(i)?.nativeElement, 'opacity', stt > 2 ? 0 : 1);
    }
    stt = 0;
    for (var i = (this.active - 1); i >= 0; i--) {
      stt++;
      this.renderer2.setStyle(cards.get(i)?.nativeElement, 'transform', `translateX(${-160 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(1deg)`);
      this.renderer2.setStyle(cards.get(i)?.nativeElement, 'z-index', -stt + 3);
      this.renderer2.setStyle(cards.get(i)?.nativeElement, 'filter', 'blur(2px)');
      this.renderer2.setStyle(cards.get(i)?.nativeElement, 'opacity', stt > 2 ? 0 : 1);
    }
  }

  next(): void {
    const cards = this.deckCards;
    this.active = this.active + 1 < cards.length ? this.active + 1 : this.active;
    this.loadDeck()
  }

  prev(): void {
    this.active = this.active - 1 >= 0 ? this.active - 1 : this.active;
    this.loadDeck()
  }

  test(): void {
    const cards = this.deckCards;
    // this.renderer2.setStyle(cards.get(5)?.nativeElement, 'zIndex',  -1000);
    // this.renderer2.setStyle(cards.get(5)?.nativeElement, 'color',  'red');
  }
}
