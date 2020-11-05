# frozen_string_literal: true

class IngredientUnit < ApplicationRecord # rubocop:disable Style/Documentation
  validates :ingredient, presence: true
  validates :unit, presence: true

  belongs_to :ingredient
  belongs_to :unit
  has_many :recipe_ingredients, through: :ingredient
  has_many :recipes, through: :recipe_ingredients
end
