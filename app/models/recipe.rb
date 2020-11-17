# frozen_string_literal: true

class Recipe < ApplicationRecord # rubocop:disable Style/Documentation
  validates :name, presence: true
  validates :content, presence: true

  has_many :recipe_ingredients
  has_many :ingredients, through: :recipe_ingredients

  accepts_nested_attributes_for :recipe_ingredients, reject_if: :all_blank, allow_destroy: true

  has_rich_text :content
  has_one_attached :picture
end
