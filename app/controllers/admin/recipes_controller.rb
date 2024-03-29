# frozen_string_literal: true

module Admin
  class RecipesController < AdminController # rubocop:disable Style/Documentation
    def index
      @recipes = Recipe.all.order("lower(name)").group_by do |recipe|
        recipe.name[0].downcase
      end
    end

    def new
      @recipe = Recipe.new
      @ingredient = Ingredient.new
    end

    def edit
      @recipe = Recipe.friendly.find(params[:id])
      @ingredient = Ingredient.new
    end

    def create
      @recipe = Recipe.new(recipe_params)
      @ingredient = Ingredient.new
      if @recipe.save
        redirect_to recipe_path(@recipe.friendly_id)
      else
        render :new
      end
    end

    def update
      @recipe = Recipe.friendly.find(params[:id])
      @recipe.update_attributes(recipe_params)
      @ingredient = Ingredient.new
      if @recipe.save
        redirect_to recipe_path(@recipe.friendly_id)
      else
        render :edit
      end
    end

    private

    def recipe_params
      params.require(:recipe).permit(
        :name,
        :portions,
        :is_sweet,
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
