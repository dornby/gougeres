# frozen_string_literal: true

module Admin
  class RecipesController < AdminController # rubocop:disable Style/Documentation
    def index
      @recipes = Recipe.all
    end

    def new
      @recipe = Recipe.new
      @ingredient = Ingredient.new
    end

    def edit
      @recipe = Recipe.find(params['id'])
      @ingredient = Ingredient.new
    end

    def create
      @recipe = Recipe.create!(recipe_params)
      redirect_to recipe_path(@recipe)
    end

    def update
      @recipe = Recipe.find(params['id'])
      @recipe.update(recipe_params)
      redirect_to recipe_path(@recipe)
    end

    private

    def recipe_params
      params.require(:recipe).permit(
        :name,
        :portions,
        :content,
        :picture,
        recipe_ingredients_attributes: recipe_ingredients_attributes
      )
    end

    def recipe_ingredients_attributes
      %i[id quantity comment ingredient_id unit_id _destroy]
    end
  end
end
