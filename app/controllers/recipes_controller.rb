# frozen_string_literal: true

class RecipesController < ApplicationController # rubocop:disable Style/Documentation
  def index
    @recipes = Recipe.all.group_by do |recipe|
      recipe.name[0]
    end
  end

  def show
    @recipe = Recipe.find(params['id'])
  end
end
