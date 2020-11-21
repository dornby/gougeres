class RenameUsersToReviewers < ActiveRecord::Migration[6.0]
  def change
    rename_table :users, :reviewers
    rename_table :user_wine_reviews, :wine_reviews
  end
end
