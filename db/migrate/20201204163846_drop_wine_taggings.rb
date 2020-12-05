class DropWineTaggings < ActiveRecord::Migration[6.0]
  def change
    drop_table :wine_taggings
  end
end
