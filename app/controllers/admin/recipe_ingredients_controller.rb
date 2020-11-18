# frozen_string_literal: true

module Admin
  class RecipeIngredientsController < AdminController # rubocop:disable Style/Documentation
    def index
      @recipe = Recipe.find(params['recipe_id'])
      @recipe_ingredients = @recipe.recipe_ingredients

      respond_to do |format|
        format.json { render json: @recipe_ingredients }
      end
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
