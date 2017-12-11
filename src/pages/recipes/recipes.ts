import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { RecipesService } from '../../services/recipes';
import { Recipe } from '../../models/recipe';
import { RecipePage } from '../recipe/recipe';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  recipes: Recipe[];

  constructor(
    public navCtrl: NavController,
    private recipesService: RecipesService
  ) {
  }

  ionViewWillEnter() {
    this.recipes = this.recipesService.getItems();
  }

  onLoadRecipe(recipe: Recipe, index: number) {
    this.navCtrl.push(RecipePage, {recipe, index});
  }

  onNewRecipe() {
    this.navCtrl.push(EditRecipePage);
  }

}
