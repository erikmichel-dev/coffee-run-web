import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { BrewerComponent } from './brewer/brewer.component';
import { CatalogComponent } from './catalog/catalog.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { CoffeeCardComponent } from './brewer/coffee-card/coffee-card.component';



@NgModule({
  declarations: [
    DashboardComponent,
    BrewerComponent,
    CatalogComponent,
    TopBarComponent,
    CoffeeCardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DashboardModule { }
