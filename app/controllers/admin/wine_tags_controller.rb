# frozen_string_literal: true

module Admin
  class WineTagsController < ApplicationController # rubocop:disable Style/Documentation
    def index
      @wine_tags = WineTag.all

      respond_to do |format|
        format.json { render json: @wine_tags }
      end
    end

    def queried_index
      @wine_tags = WineTag.where("colors @> ARRAY[?]", params["wine_color"]).sort_by(&:id)

      respond_to do |format|
        format.json { render json: @wine_tags }
      end
    end

    def show
      @wine_tag = WineTag.find(params["id"])

      respond_to do |format|
        format.json { render json: @wine_tag }
      end
    end
  end
end
