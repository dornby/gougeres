# frozen_string_literal: true

class Recipe < ApplicationRecord # rubocop:disable Style/Documentation
  extend FriendlyId
  friendly_id :name, use: :slugged

  validates :name, presence: { message: 'doit être rempli' }
  validates :content, presence: { message: 'doit être rempli' }

  has_many :recipe_ingredients
  has_many :ingredients, through: :recipe_ingredients

  accepts_nested_attributes_for :recipe_ingredients, reject_if: :all_blank, allow_destroy: true

  has_rich_text :content
  has_one_attached :picture
end
