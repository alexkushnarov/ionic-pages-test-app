import { Ingredient } from '../models/ingredient';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth';
import 'rxjs/Rx';

@Injectable()
export class ShoppingListService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private ingredients: Ingredient[] = [];

  addItem(name: string, amount: number) {
    this.ingredients.push(new Ingredient(name, amount));
  }

  addItems(items: Ingredient[]) {
    this.ingredients.push(...items);
  }

  getItems() {
    return this.ingredients.slice();
  }

  removeItem(index: number) {
    this.ingredients.splice(index, 1);
  }

  storeList(token: string) {
    const userId = this.authService.getCurrentUser().uid;
    return this.http.put(`https://my-test-ng-recipe-book.firebaseio.com/${userId}/shopping-list.json?auth=${token}`, this.ingredients);
  }

  fetchList(token: string) {
    const userId = this.authService.getCurrentUser().uid;
    return this.http.get(`https://my-test-ng-recipe-book.firebaseio.com/${userId}/shopping-list.json?auth=${token}`)
      .do((res: Ingredient[]) => {
        this.ingredients = res || [];
      })
  }
}
