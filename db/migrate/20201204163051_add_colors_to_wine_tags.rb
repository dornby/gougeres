class AddColorsToWineTags < ActiveRecord::Migration[6.0]
  def change
    add_column :wine_tags, :colors, :text, array: true, default: []
  end
end
