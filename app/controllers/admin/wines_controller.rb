# frozen_string_literal: true

module Admin
  class WinesController < AdminController # rubocop:disable Style/Documentation
    def index
      @wines = Wine.all
    end

    def new
      @wine = Wine.new
    end

    def edit
      @wine = Wine.find(params['id'])
    end

    def create
      @wine = Wine.new(wine_params)
      if @wine.save
        redirect_to wine_path(@wine)
      else
        render :new
      end
    end

    def update
      @wine = Wine.find(params['id'])
      @wine.update_attributes(wine_params)
      if @wine.save
        redirect_to wine_path(@wine)
      else
        render :edit
      end
    end

    private

    def wine_params
      params.require(:wine).permit(
        :name,
        :domain,
        :variety,
        :color
      )
    end
  end
end
