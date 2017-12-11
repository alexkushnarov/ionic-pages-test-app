import { Component } from '@angular/core';
import { ActionSheetController, AlertController, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipesService } from '../../services/recipes';
import { Recipe } from '../../models/recipe';

@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage {
  mode: string;
  recipeForm: FormGroup;
  recipe: Recipe;
  recipeIndex: number;
  selectOptions = ['Easy', 'Medium', 'Hard'];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private toastController: ToastController,
    private recipesService: RecipesService
  ) {
  }

  ngOnInit() {
    this.mode = this.navParams.get('mode') || 'New';
    if (this.mode === 'Edit') {
      this.recipe = this.navParams.get('recipe');
      this.recipeIndex = this.navParams.get('index');
    }
    this.initForm();
  }

  onSubmit() {
    const value = this.recipeForm.value;
    let ingredients = [];
    if (value.ingredients.length > 0) {
      ingredients = value.ingredients.map(name => {
        return {name, amount: 1};
      });
    }
    if (this.mode === 'Edit') {
      this.recipesService.updateItem(
        this.recipeIndex,
        value.title,
        value.description,
        value.difficulty,
        ingredients)
    } else {
      this.recipesService.addItem(
        value.title,
        value.description,
        value.difficulty,
        ingredients
      );
    }
    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }

  onManageIngredients() {
    const actionSheet = this.actionSheetController.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add Ingredient',
          handler: () => {
            this.createNewIngredientAlert().present();
          }
        },
        {
          text: 'Remove all Ingredients',
          role: 'destructive',
          handler: () => {
            const formArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            const length = formArray.length;
            if (length > 0) {
              for (let i = length - 1; i >= 0; i--) {
                formArray.removeAt(i);
              }
            }
            const toast = this.toastController.create({
              message: 'All Ingredients were deleted!',
              duration: 2000,
              position: 'top'
            });
            toast.present();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  private createNewIngredientAlert() {
    return this.alertController.create({
      title: 'Add Ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: (data) => {
            if(data && (data.name.trim() == '' || data.name == null)) {
              const toast = this.toastController.create({
                message: 'Please enter a valid value!',
                duration: 2000,
                position: 'top'
              });
              toast.present();
              return;
            }
            (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required));
            const toast = this.toastController.create({
              message: 'Ingredient Added!',
              duration: 2000,
              position: 'top'
            });
            toast.present();
          }
        }
      ]
    });
  }

  private initForm() {
    let title = null;
    let description = null;
    let difficulty = this.selectOptions[1];
    let ingredients = [];

    if (this.mode === 'Edit') {
      title = this.recipe.title;
      description = this.recipe.description;
      difficulty = this.recipe.difficulty;
      this.recipe.ingredients.forEach((ingredient) => {
        ingredients.push(new FormControl(ingredient.name, Validators.required))
      });
    }

    this.recipeForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'difficulty': new FormControl(difficulty, Validators.required),
      'ingredients': new FormArray(ingredients)
    });
  }
}
