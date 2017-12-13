import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { EditRecipePageModule } from '../pages/edit-recipe/edit-recipe.module';
import { RecipesPageModule } from '../pages/recipes/recipes.module';
import { RecipePageModule } from '../pages/recipe/recipe.module';
import { ShoppingListPageModule } from '../pages/shopping-list/shopping-list.module';
import { TabsPageModule } from '../pages/tabs/tabs.module';

import { ShoppingListService } from '../services/shopping-list';
import { RecipesService } from '../services/recipes';
import { SigninPageModule } from '../pages/signin/signin.module';
import { SignupPageModule } from '../pages/signup/signup.module';
import { AuthService } from '../services/auth';
import { DbOptionsPage } from '../pages/db-options/db-options';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
    DbOptionsPage
  ],
  imports: [
    BrowserModule,
    EditRecipePageModule,
    RecipePageModule,
    RecipesPageModule,
    ShoppingListPageModule,
    TabsPageModule,
    SigninPageModule,
    SignupPageModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DbOptionsPage
  ],
  providers: [
    HttpClient,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShoppingListService,
    RecipesService,
    AuthService
  ]
})
export class AppModule {}
