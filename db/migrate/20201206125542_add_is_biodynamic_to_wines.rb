class AddIsBiodynamicToWines < ActiveRecord::Migration[6.0]
  def change
    add_column :wines, :is_biodynamic, :boolean, default: false
  end
end
