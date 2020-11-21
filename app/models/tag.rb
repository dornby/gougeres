# frozen_string_literal: true

class Tag < ApplicationRecord # rubocop:disable Style/Documentation
  has_many :wine_taggings
  has_many :wines, through: :wine_taggings
end
