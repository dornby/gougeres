class AddDefaultValueToIsSweetInRecipes < ActiveRecord::Migration[6.0]
  def change
    change_column :recipes, :is_sweet, :boolean, default: false
  end
end
