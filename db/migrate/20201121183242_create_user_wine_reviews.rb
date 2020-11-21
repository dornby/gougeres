class CreateUserWineReviews < ActiveRecord::Migration[6.0]
  def change
    create_table :user_wine_reviews do |t|
      t.references :user
      t.references :wine
      t.integer :review
      t.timestamps
    end
  end
end
