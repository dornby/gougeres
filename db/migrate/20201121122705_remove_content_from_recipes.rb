class RemoveContentFromRecipes < ActiveRecord::Migration[6.0]
  def change
    remove_column :recipes, :content
  end
end
