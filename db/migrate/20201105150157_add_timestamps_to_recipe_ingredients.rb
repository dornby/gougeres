class AddTimestampsToRecipeIngredients < ActiveRecord::Migration[6.0]
  def change
    add_column :recipe_ingredients, :created_at, :datetime, null: false
    add_column :recipe_ingredients, :updated_at, :datetime, null: false
  end
end
