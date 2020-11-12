# frozen_string_literal: true

class IngredientsController < ApplicationController # rubocop:disable Style/Documentation
  def index
    @ingredients = Ingredient.order(:name)

    respond_to do |format|
      format.json { render json: @ingredients }
    end
  end
end
