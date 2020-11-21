class CreateWines < ActiveRecord::Migration[6.0]
  def change
    create_table :wines do |t|
      t.string :name
      t.string :domain
      t.string :variety
      t.float :review
      t.timestamps
    end
  end
end
