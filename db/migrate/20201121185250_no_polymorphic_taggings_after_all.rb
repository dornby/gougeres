class NoPolymorphicTaggingsAfterAll < ActiveRecord::Migration[6.0]
  def change
    remove_column :wine_taggings, :taggable_type
    rename_column :wine_taggings, :taggable_id, :wine_id
  end
end
