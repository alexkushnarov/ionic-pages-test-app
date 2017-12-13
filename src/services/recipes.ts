import { Recipe } from '../models/recipe';
import { Ingredient } from '../models/ingredient';
import { AuthService } from './auth';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';

@Injectable()
export class RecipesService {

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) {}

  private recipes: Recipe[] = [];

  addItem(
    title: string,
    description: string,
    difficulty: string,
    ingredients: Ingredient[]
  ) {
    this.recipes.push(
      new Recipe(
        title,
        description,
        difficulty,
        ingredients
      )
    );
  }

  getItems() {
    return this.recipes.slice();
  }

  updateItem(
    index: number,
    title: string,
    description: string,
    difficulty: string,
    ingredients: Ingredient[]
  ) {
    this.recipes[index] = new Recipe(
      title,
      description,
      difficulty,
      ingredients
    );
  }

  removeItem(index: number) {
    this.recipes.splice(index, 1);
  }

  storeList(token: string) {
    const userId = this.authService.getCurrentUser().uid;
    return this.http.put(`https://my-test-ng-recipe-book.firebaseio.com/${userId}/recipes.json?auth=${token}`, this.recipes);
  }

  fetchList(token: string) {
    const userId = this.authService.getCurrentUser().uid;
    return this.http.get(`https://my-test-ng-recipe-book.firebaseio.com/${userId}/recipes.json?auth=${token}`)
      .do((res: Recipe[]) => {
        this.recipes = res || [];
      })
  }
}
