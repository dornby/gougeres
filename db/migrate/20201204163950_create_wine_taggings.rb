class CreateWineTaggings < ActiveRecord::Migration[6.0]
  def change
    create_table :wine_taggings do |t|
      t.references :wine
      t.references :wine_tag
      t.timestamps
    end
  end
end
