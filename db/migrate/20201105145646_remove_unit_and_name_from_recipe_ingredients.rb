class RemoveUnitAndNameFromRecipeIngredients < ActiveRecord::Migration[6.0]
  def change
    remove_column :recipe_ingredients, :unit, :string
    remove_column :recipe_ingredients, :name, :string
  end
end
