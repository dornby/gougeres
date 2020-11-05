# frozen_string_literal: true

class Recipe < ApplicationRecord # rubocop:disable Style/Documentation
  validates :name, presence: true

  has_many :recipe_ingredients
  has_many :ingredients, through: :recipe_ingredients
end
