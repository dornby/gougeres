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
      @recipe = Recipe.new(recipe_params)
      @ingredient = Ingredient.new
      if @recipe.save
        redirect_to recipe_path(@recipe)
      else
        render :new
      end
    end

    def update
      @recipe = Recipe.find(params['id'])
      @recipe.update_attributes(recipe_params)
      @ingredient = Ingredient.new
      if @recipe.save
        redirect_to recipe_path(@recipe)
      else
        render :edit
      end
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
