class ChangeTaggingsToWineTaggings < ActiveRecord::Migration[6.0]
  def change
    rename_table :taggings, :wine_taggings
  end
end
