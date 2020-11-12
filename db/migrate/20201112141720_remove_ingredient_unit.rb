class RemoveIngredientUnit < ActiveRecord::Migration[6.0]
  def change
    drop_table :ingredient_units
  end
end
