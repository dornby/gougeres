class AddRegionToWines < ActiveRecord::Migration[6.0]
  def change
    add_column :wines, :region, :string
  end
end
