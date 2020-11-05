class DropRecipeIngredientUnits < ActiveRecord::Migration[6.0]
  def change
    drop_table :recipe_ingredient_units
  end
end
