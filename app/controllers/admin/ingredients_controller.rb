# frozen_string_literal: true

module Admin
  class IngredientsController < ApplicationController # rubocop:disable Style/Documentation
    def index
      @ingredients = Ingredient.order(:name)

      respond_to do |format|
        format.json { render json: @ingredients }
      end
    end

    def create
      @ingredient = Ingredient.create!(ingredient_params)
    end

    private

    def ingredient_params
      params.require(:ingredient).permit(:name)
    end
  end
end
