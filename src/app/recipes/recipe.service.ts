import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Bolo de Chocolate', 
      'O melhor bolo de chocolate do mundo', 
      'https://i.pinimg.com/736x/66/69/f3/6669f3d5741a40fc2bd54f0b6e8cbe33--pao-videos.jpg',
      [
        new Ingredient('Chocolate em pó', 2),
        new Ingredient('Açúcar', 3),
        new Ingredient('Leite', 3),
        new Ingredient('Farinha de trigo', 2)
      ]
    ),
    new Recipe(
      'Pudim de Leite', 
      'O melhor pudim de leite do mundo', 
      'https://www.receitas-sem-fronteiras.com/media/pudim1-2_crop.jpg/rh/pudim-de-leite-condensado.jpg',
      [
        new Ingredient('Leite condensado', 2),
        new Ingredient('Açúcar', 3),
        new Ingredient('Leite', 3),
        new Ingredient('Ovos', 2)
      ]
    ),
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
      return this.recipes.slice(); // slice faz uma nova cópia do array de recipes...
  }

  getRecipe(index: number) {
      return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
      this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}