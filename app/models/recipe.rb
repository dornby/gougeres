# frozen_string_literal: true

class Recipe < ApplicationRecord # rubocop:disable Style/Documentation
  validates :name, presence: true
  validates :content, presence: true

  has_many :recipe_ingredients
  has_many :ingredients, through: :recipe_ingredients

  has_rich_text :content
end
