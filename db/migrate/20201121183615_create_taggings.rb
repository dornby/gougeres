class CreateTaggings < ActiveRecord::Migration[6.0]
  def change
    create_table :taggings do |t|
      t.references :wine
      t.references :user
      t.timestamps
    end
  end
end
