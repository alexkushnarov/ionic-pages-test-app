import { Recipe } from '../models/recipe';
import { Ingredient } from '../models/ingredient';

export class RecipesService {
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
}
