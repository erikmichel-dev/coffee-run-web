import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Coffee } from '../models/coffee';
import { BehaviorSubject, Observable, map, tap, combineLatest, min } from 'rxjs';
import { UserData } from '../models/userData';
import { FilterOptions } from '../enums/filter-options';

@Injectable({
  providedIn: 'root'
})
export class BrewerService {
  public brewedCoffee$: Observable<Coffee | null>;
  public collectedCardDeck$: Observable<Coffee[]>
  public isLoading$: Observable<boolean | null>;
  private readonly _brewedCoffee = new BehaviorSubject<Coffee | null>(null);
  private readonly _collectedCardDeck = new BehaviorSubject<Coffee[]>([]);
  private readonly _isLoading = new BehaviorSubject<boolean | null>(false);

  private userData: UserData | undefined;

  private cardTiers: Record<string, number> = {
    Legendary: 5,
    Epic: 4,
    Rare: 3,
    Uncommon: 2,
    Common: 1
  };

  constructor(private _backend: BackendService) {
    this.brewedCoffee$ = this._brewedCoffee.asObservable();
    this.collectedCardDeck$ = this._collectedCardDeck.asObservable();
    this.isLoading$ = this._isLoading.asObservable();
  }

  userDataInit(): void {
    let userData = localStorage.getItem('userData');
    if (userData) {
      this.userData = this.deserializeUserData(atob(userData));

      if (this.userData?.deck) {
        this._collectedCardDeck.next(this.userData?.deck);
        this.orderDeckBy(FilterOptions.Name)
      }
      return;
    }

    this.userData = {
      user_id: '',
      grain_currency: 0,
      deck: []
    }

    this.userDataSave();
  }

  userDataSave(): void {
    if (this.userData) localStorage.setItem('userData', btoa(this.serializeUserData(this.userData)));
  }

  serializeUserData(userData: UserData): string {
    let minUserData = `${userData.user_id}:${userData.grain_currency}:`;
    userData.deck.forEach((card, index) => {
      minUserData = minUserData.concat(`${card.coffee_id}%${card.name}%${card.description}%${card.tier}%${card.origin}%${card.cost}`)
      if (index !== userData.deck.length - 1) {
        minUserData = minUserData.concat(";");
      }
    });
    return minUserData;
  }

  deserializeUserData(serializeUserData: string): UserData {
    const [user_id, grain_currency, deck] = serializeUserData.split(':');
    const deckItems = deck.split(';').map(item => {
      const [coffee_id, name, description, tier, origin, cost] = item.split('%')
      return {
        coffee_id,
        name,
        description,
        tier,
        origin,
        cost: Number(cost)
      }
    })

    return {
      user_id: user_id,
      grain_currency: Number(grain_currency),
      deck: deckItems
    };
  }

  orderDeckBy(filterOption: FilterOptions, activeCardPosition?: number): number {
    const deckCards = this._collectedCardDeck.getValue();
    const activeCardName = deckCards[activeCardPosition ?? 0].name;

    switch (filterOption) {
      case FilterOptions.Name:
        deckCards.sort((a, b) => a.name < b.name ? -1 : 1);
        break;
      case FilterOptions.Cost:
        deckCards.sort((a, b) => b.cost - a.cost);
        break;
      case FilterOptions.Origin:
        deckCards.sort((a, b) => a.origin < b.origin ? -1 : 1);
        break;
      case FilterOptions.Tier:
        deckCards.sort((a, b) => this.cardTiers[b.tier] - this.cardTiers[a.tier]);
        break;
    }

    return deckCards.findIndex(card => card.name === activeCardName);
  }

  getCoffeeCard(): void {
    this.reset();
    this._isLoading.next(true);

    this._backend.getItem<Coffee>('/daily-coffee')
      .subscribe(coffee => {
        setTimeout(() => {
          if (!this.userData?.deck.find(card => card.name === coffee.name)) {
            this.userData?.deck.push(coffee);
            this.userDataSave();
            this._collectedCardDeck.next(this.userData?.deck ?? []);
          }
          this._brewedCoffee.next(coffee);
          this._isLoading.next(false);
        }, 1800)
      });

  }

  getCardByPosition(position: number): Coffee {
   return this._collectedCardDeck.getValue()[position];
  }

  reset(): void {
    this._brewedCoffee.next(null);
  }
}