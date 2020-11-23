# frozen_string_literal: true

class Ingredient < ApplicationRecord # rubocop:disable Style/Documentation
  validate :name_presence, :name_uniqueness

  has_many :recipe_ingredients
  has_many :ingredient_units
  has_many :recipes, through: :recipe_ingredients
  has_many :units, through: :ingredient_units

  def name_presence
    errors.add(:base, 'Le champ doit être remplit') if name.blank?
  end

  def name_uniqueness
    errors.add(:base, 'Cet ingrédient existe déjà') if name_exists(name)
  end

  private

  def name_exists(name)
    Ingredient.all.map{ |i| i.name.downcase }.include?(name.downcase)
  end
end
