class AddIsOrganicToWines < ActiveRecord::Migration[6.0]
  def change
    add_column :wines, :is_organic, :boolean, default: false
  end
end
