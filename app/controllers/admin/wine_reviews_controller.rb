# frozen_string_literal: true

module Admin
  class WineReviewsController < AdminController # rubocop:disable Style/Documentation
    def index
      @wine_reviews = WineReview.where(wine_id: params['wine_id'])
      respond_to do |format|
        format.json { render json: @wine_reviews }
      end
    end
  end
end
