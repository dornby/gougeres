# frozen_string_literal: true

class Ingredient < ApplicationRecord # rubocop:disable Style/Documentation
  validates :name, presence: true, uniqueness: {case_sensitive: false}

  has_many :recipe_ingredients
  has_many :ingredient_units
  has_many :recipes, through: :recipe_ingredients
  has_many :units, through: :ingredient_units
end
