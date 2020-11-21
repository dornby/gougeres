class ChangeTagsToWineTags < ActiveRecord::Migration[6.0]
  def change
    rename_table :tags, :wine_tags
  end
end
