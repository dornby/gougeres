class AverageReviewToFloat < ActiveRecord::Migration[6.0]
  def change
    change_column :wines, :average_review, :float
  end
end
