# frozen_string_literal: true

class RecipeIngredient < ApplicationRecord # rubocop:disable Style/Documentation
  validates :quantity, presence: true

  belongs_to :recipe
  belongs_to :ingredient
  belongs_to :unit
end
