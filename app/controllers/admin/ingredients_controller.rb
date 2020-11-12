# frozen_string_literal: true

module Admin
  class IngredientsController < ApplicationController # rubocop:disable Style/Documentation
    def index
      @ingredients = Ingredient.order(:name)

      respond_to do |format|
        format.json { render json: @ingredients }
      end
    end

    def new
      @ingredient = Ingredient.new
    end
  end
end
