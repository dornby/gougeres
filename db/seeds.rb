# frozen_string_literal: true

Recipe.destroy_all
Ingredient.destroy_all
Unit.destroy_all
RecipeIngredient.destroy_all

RECIPES = [
  { name: "Salade de pois chiches à la grecque", content: "Bonjour" },
  { name: "Taralli", content: "Bonjour" },
  { name: "Hachis Parmentier", content: "Bonjour" },
  { name: "Minestrone", content: "Bonjour" },
  { name: "Pasta Dough", content: "Bonjour" },
  { name: "Pasta al ragú", content: "Bonjour" },
  { name: "Babka", content: "Bonjour" },
  { name: "Butter Chicken", content: "Bonjour" }
].freeze

def create_recipe_ingredient(recipe, ingredient_name, quantity, unit_name)
  ingredient = Ingredient.find_by(name: ingredient_name) || Ingredient.create!(name: ingredient_name)
  unit = Unit.find_by(name: unit_name) || Unit.create!(name: unit_name)

  recipe.recipe_ingredients.create!(
    ingredient: ingredient,
    quantity: quantity,
    unit: unit
  )
end

RECIPES.each do |recipe_instance|
  recipe = Recipe.create!(name: recipe_instance[:name], content: recipe_instance[:content])
  case recipe.name
  when "Salade de pois chiches à la grecque"
    create_recipe_ingredient(recipe, "Pois chiches cuits", 400, "g")
    create_recipe_ingredient(recipe, "Tomates cerises", 250, "g")
    create_recipe_ingredient(recipe, "Concombre", 1, "unité(s)")
    create_recipe_ingredient(recipe, "Feta", 200, "g")
    create_recipe_ingredient(recipe, "Olives noires à la grecque", 100, "g")
    create_recipe_ingredient(recipe, "Oignon rouge", 1, "unité(s)")
    create_recipe_ingredient(recipe, "Roquette", 150, "g")
    create_recipe_ingredient(recipe, "Persil plat", 3, "brin(s)")
    create_recipe_ingredient(recipe, "Huile d'olive", 3, "CaS")
    create_recipe_ingredient(recipe, "Vinaigre Doux", 3, "CaS")
    create_recipe_ingredient(recipe, "Miel", 1, "CaC")
    create_recipe_ingredient(recipe, "Citron jaune", 0.5, "unité(s)")
  when "Taralli"
    create_recipe_ingredient(recipe, "Farine T45", 250, "g")
    create_recipe_ingredient(recipe, "Vin blanc sec", 90, "g")
    create_recipe_ingredient(recipe, "Huile d'olive", 80, "g")
    create_recipe_ingredient(recipe, "Sel", 5, "g")
  end
end
