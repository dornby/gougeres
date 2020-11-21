class RenameWineReviewsUserReference < ActiveRecord::Migration[6.0]
  def change
    rename_column :wine_reviews, :user_id, :reviewer_id
  end
end
