# frozen_string_literal: true

module Admin
  class WinesController < AdminController # rubocop:disable Style/Documentation
    before_action :destroy_discardable_reviews, only: %i[create update]

    def index
      @wines = Wine.all.group_by do |wine|
        wine.name[0]
      end
    end

    def new
      @wine = Wine.new
      build_wine_reviews
    end

    def edit
      @wine = Wine.friendly.find(params[:id])
      build_wine_reviews
    end

    def create
      @wine = Wine.new(wine_params)
      if @wine.save
        compute_average_review
        redirect_to wine_path(@wine)
      else
        render :new
      end
    end

    def update
      @wine = Wine.friendly.find(params[:id])
      @wine.update_attributes(wine_params)
      if @wine.save
        compute_average_review
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
        :color,
        :picture,
        wine_reviews_attributes: %i[id review reviewer_id _destroy]
      )
    end

    def build_wine_reviews
      Reviewer.find_each do |reviewer|
        @wine.wine_reviews.build(reviewer: reviewer) unless @wine.wine_reviews.find_by(reviewer: reviewer)
      end
    end

    def compute_average_review
      @wine.average_review = @wine.wine_reviews.average(:review).round(2)
      @wine.save
    end

    def destroy_discardable_reviews
      params[:wine][:wine_reviews_attributes].each do |params_wr|
        params_wr[1]['_destroy'] = '1' if params_wr[1]['review'] == '-1'
      end
    end
  end
end
