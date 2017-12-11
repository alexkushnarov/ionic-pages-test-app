import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Recipe } from '../../models/recipe';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { RecipesService } from '../../services/recipes';
import { ShoppingListService } from '../../services/shopping-list';

@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit {
  recipe: Recipe;
  recipeIndex: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private recipesService: RecipesService,
    private shoppingListService: ShoppingListService
  ) {}

  ngOnInit() {
    this.recipe = this.navParams.get('recipe');
    this.recipeIndex = this.navParams.get('index');
  }

  onAddIngredients() {
    this.shoppingListService.addItems(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'Edit', recipe: this.recipe, index: this.recipeIndex});
  }

  onDeleteRecipe() {
    this.recipesService.removeItem(this.recipeIndex);
    this.navCtrl.pop();
  }

}
