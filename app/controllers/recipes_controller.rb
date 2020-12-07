# frozen_string_literal: true

class RecipesController < ApplicationController # rubocop:disable Style/Documentation
  def index
    @recipes = Recipe.all.order('lower(name)').group_by do |recipe|
    recipe.name[0].downcase
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
end
