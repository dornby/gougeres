# frozen_string_literal: true

class RecipesController < ApplicationController # rubocop:disable Style/Documentation
  before_action :find_recipe, only: %i[show edit]
  def index
    @recipes = Recipe.all
  end

  def show; end

  def new
    @recipe = Recipe.new
  end

  def edit; end

  private

  def find_recipe
    @recipe = Recipe.find(params['id'])
  end
end
