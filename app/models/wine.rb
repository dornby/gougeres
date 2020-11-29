# frozen_string_literal: true

class Wine < ApplicationRecord # rubocop:disable Style/Documentation
  extend FriendlyId
  friendly_id :name, use: :slugged

  validates :name, presence: { message: 'doit être rempli' }
  validates :color, presence: true

  has_many :wine_taggings
  has_many :tags, through: :wine_taggings

  has_many :wine_reviews
  has_many :reviewers, through: :wine_reviews

  accepts_nested_attributes_for :wine_reviews, reject_if: :all_blank, allow_destroy: true

  has_one_attached :picture

  COLORS = %w[Rouge Blanc Rosé].freeze
end
