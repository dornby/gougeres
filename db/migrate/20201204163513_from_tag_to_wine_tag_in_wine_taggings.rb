class FromTagToWineTagInWineTaggings < ActiveRecord::Migration[6.0]
  def change
    rename_column :wine_taggings, :tag_id, :wine_tag_id
  end
end
