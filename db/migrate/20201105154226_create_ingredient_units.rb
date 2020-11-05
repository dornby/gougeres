class CreateIngredientUnits < ActiveRecord::Migration[6.0]
  def change
    create_table :ingredient_units do |t|
      t.references :ingredient
      t.references :unit
    end
  end
end
