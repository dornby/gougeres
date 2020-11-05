class CreateRecipeIngredients < ActiveRecord::Migration[6.0]
  def change
    create_table :recipe_ingredients do |t|
      t.references :recipe
      t.string :name
      t.float :quantity
      t.string :unit
    end
  end
end
