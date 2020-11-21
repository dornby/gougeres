class FixTaggings < ActiveRecord::Migration[6.0]
  def change
    rename_column :taggings, :user_id, :tag_id
  end
end
