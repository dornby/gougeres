class AddMerchantToWines < ActiveRecord::Migration[6.0]
  def change
    add_column :wines, :merchant, :string
  end
end
