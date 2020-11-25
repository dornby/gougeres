# frozen_string_literal: true

class Wine < ApplicationRecord # rubocop:disable Style/Documentation
  validates :name, presence: true
  validates :color, presence: true

  has_many :wine_taggings
  has_many :tags, through: :wine_taggings

  has_many :wine_reviews
  has_many :reviewers, through: :wine_reviews

  has_one_attached :picture

  COLORS = %w[Rouge Blanc Rosé].freeze
end
