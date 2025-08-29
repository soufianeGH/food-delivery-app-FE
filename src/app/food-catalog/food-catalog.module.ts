import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodCatalogRoutingModule } from './food-catalog-routing.module';
import { FoodCatalogComponent } from './components/food-catalog.component';
import { Routes } from '@angular/router';


@NgModule({
  declarations: [
    FoodCatalogComponent
  ],
  imports: [
    CommonModule,
    FoodCatalogRoutingModule
  ]
})
export class FoodCatalogModule { }
