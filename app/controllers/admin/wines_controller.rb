# frozen_string_literal: true

module Admin
  class WinesController < AdminController # rubocop:disable Style/Documentation
    before_action :destroy_discardable_reviews, only: %i[create update]
    before_action :destroy_discardable_wine_taggings, only: %i[create update]

    def index
      @wines = Wine.all.group_by do |wine|
        wine.name[0]
      end
    end

    def new
      @wine = Wine.new
      build_wine_reviews
      build_wine_taggings
    end

    def edit
      @wine = Wine.friendly.find(params[:id])
      build_wine_reviews
      build_wine_taggings
    end

    def create
      @wine = Wine.new(wine_params)
      if @wine.save
        compute_average_review
        redirect_to wine_path(@wine.friendly_id)
      else
        render :new
      end
    end

    def update
      @wine = Wine.friendly.find(params[:id])
      @wine.update_attributes(wine_params)
      if @wine.save
        compute_average_review
        redirect_to wine_path(@wine.friendly_id)
      else
        render :edit
      end
    end

    def from_slug
      @wine = Wine.friendly.find(params[:q])

      respond_to do |format|
        format.json { render json: @wine }
      end
    end

    private

    def wine_params
      params.require(:wine).permit(
        :coucou,
        :name,
        :domain,
        :variety,
        :color,
        :picture,
        wine_reviews_attributes: %i[id review reviewer_id _destroy],
        wine_taggings_attributes: %i[id wine_tag_id _destroy]
      )
    end

    def build_wine_reviews
      Reviewer.find_each do |reviewer|
        @wine.wine_reviews.build(reviewer: reviewer) unless @wine.wine_reviews.find_by(reviewer: reviewer)
      end
    end

    def build_wine_taggings
      WineTag.find_each do |wine_tag|
        @wine.wine_taggings.build(wine_tag: wine_tag) unless @wine.wine_taggings.find_by(wine_tag: wine_tag)
      end
    end

    def compute_average_review
      @wine.average_review = @wine.wine_reviews&.average(:review)&.round(2)
      @wine.save
    end

    def destroy_discardable_reviews
      params[:wine][:wine_reviews_attributes]&.each do |params_wr|
        params_wr[1]['_destroy'] = '1' if params_wr[1]['review'] == '-1'
      end
    end

    def destroy_discardable_wine_taggings
      params[:wine][:wine_taggings_attributes]&.each do |params_wt|
        if params_wt[1]['wine_tag_id'][0] == 'D'
          params_wt[1]['_destroy'] = '1'
          new_param = params_wt[1]['wine_tag_id']
          new_param.slice!(0)
          params_wt[1]['wine_tag_id'] = new_param
        end
        add_ids_to_wine_taggings(params_wt)
      end
    end

    def add_ids_to_wine_taggings(params_wt)
      return unless params_wt[1]['wine_tag_id'][0] == 'E'

      tagging_id = params_wt[1]['wine_tag_id']
      tagging_id.slice!(0)
      tag_id = WineTagging.find(tagging_id).wine_tag_id.to_s
      params_wt[1]['wine_tag_id'] = tag_id
      params_wt[1]['id'] = tagging_id
    end
  end
end
