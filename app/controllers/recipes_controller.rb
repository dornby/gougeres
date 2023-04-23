# frozen_string_literal: true

class RecipesController < ApplicationController # rubocop:disable Style/Documentation
  def index
    @recipes = Recipe.all.order("lower(name)").group_by do |recipe|
      recipe.name[0].downcase
    end
  end

  def queried_index
    queried_recipes = Recipe
      .select("recipes.*, lower(recipes.name)")
      .left_outer_joins(:recipe_ingredients, :ingredients)
      .where(text_query(params[:q]))
      .where(savour_query(params[:savour]))

    @recipes = queried_recipes.distinct.order("lower(recipes.name)").group_by do |recipe|
      recipe.name[0].downcase
    end

    respond_to do |format|
      format.json { render json: @recipes }
    end
  end

  def show
    @recipe = Recipe.friendly.find(params[:id])
  end

  def from_slug
    @recipe = Recipe.friendly.find(params[:q])

    respond_to do |format|
      format.json { render json: @recipe }
    end
  end

  private

  def text_query(text)
    return if text.blank?

    query_parts = []
    query_param = text.downcase

    if text != ""
      query_parts << "lower(recipes.name) LIKE '%#{query_param}%'"
      query_parts << "lower(ingredients.name) LIKE '%#{query_param}%'"
      query_parts.join(" OR ")
    end
  end

  def savour_query(savour)
    if savour == "salty"
      "recipes.is_sweet = false"
    elsif savour == "sweet"
      "recipes.is_sweet = true"
    end
  end
end
