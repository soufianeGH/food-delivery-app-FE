import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodItemService } from '../service/fooditem.service';
import { FoodCataloguePage } from '../../shared/models/FoodCataloguePage';
import { FoodItem } from '../../shared/models/FoodItem';

@Component({
  selector: 'app-food-catalog',
  templateUrl: './food-catalog.component.html',
  styleUrl: './food-catalog.component.css'
})
export class FoodCatalogComponent {

  restaurantId!: number;
  foodItemResponse!: FoodCataloguePage;
  foodItemCart: FoodItem[] = [];
  orderSummary!: FoodCataloguePage;


  constructor(private route: ActivatedRoute, private foodItemService: FoodItemService, private router: Router) {
  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.restaurantId = +params.get('id')!;
    });

    this.getFoodItemsByRestaurant(this.restaurantId);
    
  }

  getFoodItemsByRestaurant(restaurant: number) {
    this.foodItemService.getFoodItemsByRestaurant(restaurant).subscribe(
      data => {
        this.foodItemResponse = data;
      }
    )
  }

  increment(food: any) {
    food.quantity++;
    const index = this.foodItemCart.findIndex(item => item.id === food.id);
    if (index === -1) {
      // If record does not exist, add it to the array
      this.foodItemCart.push(food);
    } else {
      // If record exists, update it in the array
      this.foodItemCart[index] = food;
    }
  }

  decrement(food: any) {
    if (food.quantity > 0) {
      food.quantity--;

      const index = this.foodItemCart.findIndex(item => item.id === food.id);
      if (this.foodItemCart[index].quantity == 0) {
        this.foodItemCart.splice(index, 1);
      } else {
        // If record exists, update it in the array
        this.foodItemCart[index] = food;
      }

    }
  }

  onCheckOut() {
    this.orderSummary = {
      foodItemsList: this.foodItemCart,
      restaurant: this.foodItemResponse.restaurant
    };
  
    console.log('🚀 Navigating to /orderSummary with data:', this.orderSummary);
  
    this.router.navigate(
      ['/orderSummary'], 
      { queryParams: { data: JSON.stringify(this.orderSummary) } }
    ).then(success => {
      console.log('✅ Navigation success:', success);
    }).catch(err => {
      console.error('❌ Navigation error:', err);
    });
  }
  


}
