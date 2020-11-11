# frozen_string_literal: true

class RecipesController < ApplicationController # rubocop:disable Style/Documentation
  def index
    @recipes = Recipe.all
  end

  def show
    @recipe = Recipe.find(params['id'])
  end
end
