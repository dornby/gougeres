class AddIngredientToRecipeIngredients < ActiveRecord::Migration[6.0]
  def change
    add_reference :recipe_ingredients, :ingredient
  end
end
