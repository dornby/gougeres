# frozen_string_literal: true

module Admin
  class WinesController < AdminController # rubocop:disable Style/Documentation
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
      @wine = Wine.find(params['id'])
      build_wine_reviews
    end

    def create
      @wine = Wine.new(wine_params)
      @wine.wine_reviews.each do |wine_review|
        wine_review.destroy if wine_review.review == -1
      end
      @wine.average_review = (@wine.wine_reviews.reject{ |wr| wr.review == -1 }.map(&:review).sum / @wine.wine_reviews.size.to_f).round(2)
      if @wine.save
        redirect_to wine_path(@wine)
      else
        render :new
      end
    end

    def update
      @wine = Wine.find(params['id'])
      @wine.update_attributes(wine_params)
      @wine.wine_reviews.each do |wine_review|
        wine_review.destroy if wine_review.review == -1
      end
      @wine.average_review = (@wine.wine_reviews.reject{ |wr| wr.review == -1 }.map(&:review).sum / @wine.wine_reviews.size.to_f).round(2)
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
  end
end
