class CreateRecipeIngredientUnits < ActiveRecord::Migration[6.0]
  def change
    create_table :recipe_ingredient_units do |t|
      t.references :recipe_ingredient
      t.references :unit
    end
  end
end
