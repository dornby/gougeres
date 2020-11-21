class RenameWineReviewToAverageReview < ActiveRecord::Migration[6.0]
  def change
    rename_column :wines, :review, :average_review
  end
end
