class AddSlugToWines < ActiveRecord::Migration[6.0]
  def change
    add_column :wines, :slug, :string
    add_index :wines, :slug, unique: true
  end
end
