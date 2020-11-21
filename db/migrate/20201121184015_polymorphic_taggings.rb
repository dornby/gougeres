class PolymorphicTaggings < ActiveRecord::Migration[6.0]
  def change
    rename_column :taggings, :wine_id, :taggable_id
    add_column :taggings, :taggable_type, :string
  end
end
