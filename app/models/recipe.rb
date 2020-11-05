# frozen_string_literal: true

class Recipe < ApplicationRecord # rubocop:disable Style/Documentation
  validates :name, presence: true

  has_many :ingredients, class_name: 'RecipeIngredient'
end
