# frozen_string_literal: true

module Admin
  class IngredientsController < ApplicationController # rubocop:disable Style/Documentation
    def index
      @ingredients = Ingredient.order(:name)

      respond_to do |format|
        format.json { render json: @ingredients }
      end
    end

    def queried_index
      @ingredients = Ingredient.order(:name).where("lower(name) LIKE ?", "%#{params[:q]}%")

      respond_to do |format|
        format.json { render json: @ingredients }
      end
    end

    def last
      @ingredient = Ingredient.last

      respond_to do |format|
        format.json { render json: @ingredient }
      end
    end

    def create
      @ingredient = Ingredient.create!(ingredient_params)
    end

    def show
      @ingredient = Ingredient.find(params["id"])

      respond_to do |format|
        format.json { render json: @ingredient }
      end
    end

    private

    def ingredient_params
      params.require(:ingredient).permit(:name)
    end
  end
end
