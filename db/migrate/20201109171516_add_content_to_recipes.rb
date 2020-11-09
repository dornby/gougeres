class AddContentToRecipes < ActiveRecord::Migration[6.0]
  def change
    add_column :recipes, :content, :text, after: :name
  end
end
