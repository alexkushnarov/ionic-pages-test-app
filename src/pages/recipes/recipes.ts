import { Component } from '@angular/core';
import { LoadingController, NavController, PopoverController } from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { RecipesService } from '../../services/recipes';
import { Recipe } from '../../models/recipe';
import { RecipePage } from '../recipe/recipe';
import { DbOptionsPage } from '../db-options/db-options';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  recipes: Recipe[];

  constructor(
    public navCtrl: NavController,
    private recipesService: RecipesService,
    private popoverController: PopoverController,
    private authService: AuthService,
    private loadingController: LoadingController
  ) {
  }

  ionViewWillEnter() {
    this.getItems();
  }

  onLoadRecipe(recipe: Recipe, index: number) {
    this.navCtrl.push(RecipePage, {recipe, index});
  }

  onNewRecipe() {
    this.navCtrl.push(EditRecipePage);
  }

  onShowOptions(event: MouseEvent) {
    const popover = this.popoverController.create(DbOptionsPage);
    popover.present({ev: event});
    popover.onDidDismiss((data) => {
      if (data && data.action === 'load') {
        const loader = this.loadingController.create({
          content: 'Loading...'
        });
        loader.present();
        this.authService.getCurrentUser().getToken()
          .then((token: string) => {
            this.recipesService.fetchList(token)
              .catch((err: Error) => {
                loader.dismiss();
                throw err;
              })
              .subscribe((res: Response) => {
                this.getItems();
                loader.dismiss();
              });
          })
          .catch((err) => {
            loader.dismiss();
            console.log(err);
          });
      } else if (data && data.action === 'store') {
        const loader = this.loadingController.create({
          content: 'Saving...'
        });
        loader.present();
        this.authService.getCurrentUser().getToken()
          .then((token: string) => {
            this.recipesService.storeList(token)
              .catch((err: Error) => {
                loader.dismiss();
                throw err;
              })
              .subscribe((res: Response) => {
                console.log('Response', res);
                loader.dismiss();
              })
          })
          .catch((err) => {
            console.log(err);
            loader.dismiss();
          });
      }
    });
  }

  private getItems() {
    this.recipes = this.recipesService.getItems();
  }
}
