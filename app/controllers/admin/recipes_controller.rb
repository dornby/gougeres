# frozen_string_literal: true

module Admin
  class RecipesController < AdminController # rubocop:disable Style/Documentation
    def index
      @recipes = Recipe.all
    end

    def new
      @recipe = Recipe.new
    end

    def edit
      @recipe = Recipe.find(params['id'])
    end
  end
end
