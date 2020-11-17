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
    end

    def create
      @recipe = Recipe.create!(recipe_params)
      redirect_to recipe_path(@recipe)
    end

    private

    def recipe_params
      params.require(:recipe).permit(
        :name,
        :content,
        :picture,
        recipe_ingredients_attributes: [
          :quantity,
          :ingredient_id,
          :unit_id
        ]
      )
    end
  end
end
