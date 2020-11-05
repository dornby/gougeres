# frozen_string_literal: true

class RecipeIngredient < ApplicationRecord # rubocop:disable Style/Documentation
  validates :name, presence: true
  validates :quantity, presence: true
  validates :unit, presence: true

  has_one :recipe
end
