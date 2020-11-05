# frozen_string_literal: true

class Unit < ApplicationRecord # rubocop:disable Style/Documentation
  validates :name, presence: true

  has_many :ingredient_units
  has_many :ingredients, through: :ingredient_units
end
