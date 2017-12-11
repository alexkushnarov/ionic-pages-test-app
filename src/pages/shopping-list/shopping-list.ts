import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../../services/shopping-list';
import { Ingredient } from '../../models/ingredient';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  ingredients: Ingredient[] = [];

  constructor(private shoppingListService: ShoppingListService) {}

  ionViewWillEnter() {
    this.getIngredients();
  }

  onSubmit(form: NgForm) {
    this.shoppingListService.addItem(form.value.ingredient, form.value.amount);
    form.reset();
    this.getIngredients();
  }

  onRemoveItem(index: number) {
    this.shoppingListService.removeItem(index);
    this.getIngredients();
  }

  private getIngredients() {
    this.ingredients = this.shoppingListService.getItems();
  }

}
