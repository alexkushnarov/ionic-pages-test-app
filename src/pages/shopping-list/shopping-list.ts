import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../../services/shopping-list';
import { Ingredient } from '../../models/ingredient';
import { LoadingController, PopoverController } from 'ionic-angular';
import { DbOptionsPage } from '../db-options/db-options';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  ingredients: Ingredient[] = [];

  constructor(
    private shoppingListService: ShoppingListService,
    private popoverController: PopoverController,
    private authService: AuthService,
    private loadingController: LoadingController
  ) {}

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
            this.shoppingListService.fetchList(token)
              .catch((err: Error) => {
                loader.dismiss();
                throw err;
              })
              .subscribe((res: Response) => {
                this.getIngredients();
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
            this.shoppingListService.storeList(token)
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

  private getIngredients() {
    this.ingredients = this.shoppingListService.getItems();
  }

}
