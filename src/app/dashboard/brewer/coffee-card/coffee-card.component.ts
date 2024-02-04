import { Component, Input } from '@angular/core';
import { Coffee } from 'src/app/shared/models/coffee';

@Component({
  selector: 'app-coffee-card',
  templateUrl: './coffee-card.component.html',
  styleUrls: ['./coffee-card.component.css']
})
export class CoffeeCardComponent {
  @Input() public brewedCoffee: Coffee | null | undefined;

  public test(): void {
    console.log(this.brewedCoffee)
  }
}
