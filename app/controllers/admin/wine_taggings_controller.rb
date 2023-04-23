# frozen_string_literal: true

module Admin
  class WineTaggingsController < AdminController # rubocop:disable Style/Documentation
    def index
      @wine_taggings = WineTagging.where(wine_id: params["wine_id"])
      respond_to do |format|
        format.json { render json: @wine_taggings }
      end
    end
  end
end
