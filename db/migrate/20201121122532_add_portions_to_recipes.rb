class AddPortionsToRecipes < ActiveRecord::Migration[6.0]
  def change
    add_column :recipes, :portions, :integer
  end
end
