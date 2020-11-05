# frozen_string_literal: true

def create_recipe_ingredient(recipe, ingredient_name, quantity, unit_name)
  ingredient = Ingredient.find_by(name: ingredient_name) || Ingredient.create!(name: ingredient_name)
  unit = Unit.find_by(name: unit_name) || Unit.create!(name: unit_name)

  IngredientUnit.find_by(ingredient: ingredient, unit: unit) || ingredient.ingredient_units.create!(unit: unit)

  recipe.recipe_ingredients.create!(
    ingredient: ingredient,
    quantity: quantity,
    unit: unit
  )
end

RECIPES = [
  {
    name: 'Salade de pois chiches à la grecque'
  },
  {
    name: 'Tarallis'
  }
].freeze

RECIPES.each do |recipe|
  recipe_instance = Recipe.create!(name: recipe[:name])
  case recipe_instance.name
  when 'Salade de pois chiches à la grecque'
    create_recipe_ingredient(recipe_instance, 'Pois chiches cuits', 400, 'g')
    create_recipe_ingredient(recipe_instance, 'Tomates cerises', 250, 'g')
    create_recipe_ingredient(recipe_instance, 'Concombre', 1, 'unité(s)')
    create_recipe_ingredient(recipe_instance, 'Feta', 200, 'g')
    create_recipe_ingredient(recipe_instance, 'Olives noires à la grecque', 100, 'g')
    create_recipe_ingredient(recipe_instance, 'Oignon rouge', 1, 'unité(s)')
    create_recipe_ingredient(recipe_instance, 'Roquette', 150, 'g')
    create_recipe_ingredient(recipe_instance, 'Persil plat', 3, 'brin(s)')
    create_recipe_ingredient(recipe_instance, "Huile d'olive", 3, 'CaS')
    create_recipe_ingredient(recipe_instance, 'Vinaigre Doux', 3, 'CaS')
    create_recipe_ingredient(recipe_instance, 'Miel', 1, 'CaC')
    create_recipe_ingredient(recipe_instance, 'Citron jaune', 0.5, 'unité(s)')
  when 'Tarallis'
    create_recipe_ingredient(recipe_instance, 'Farine T45', 250, 'g')
    create_recipe_ingredient(recipe_instance, 'Vin blanc sec', 90, 'g')
    create_recipe_ingredient(recipe_instance, "Huile d'olive", 80, 'g')
    create_recipe_ingredient(recipe_instance, 'Sel', 5, 'g')
  end
end
