class AddIsSweetToRecipes < ActiveRecord::Migration[6.0]
  def change
    add_column :recipes, :is_sweet, :boolean
  end
end
