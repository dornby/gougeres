class RenameDomainToProducerInWines < ActiveRecord::Migration[6.0]
  def change
    rename_column :wines, :domain, :producer
  end
end
