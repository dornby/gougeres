class AddIsNaturalToWines < ActiveRecord::Migration[6.0]
  def change
    add_column :wines, :is_natural, :boolean, default: false
  end
end
