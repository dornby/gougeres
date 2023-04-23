# frozen_string_literal: true

class WinesController < ApplicationController # rubocop:disable Style/Documentation
  def index
    @wines = Wine.all.order("lower(name)").group_by do |wine|
      wine.name[0].downcase
    end
  end

  def queried_index
    queried_wines = Wine.where(text_query(params[:q]))

    @wines = queried_wines.order("lower(name)").group_by do |wine|
      wine.name[0].downcase
    end

    respond_to do |format|
      format.json { render json: @wines }
    end
  end

  def show
    @wine = Wine.friendly.find(params[:id])
  end

  def from_slug
    @wine = Wine.friendly.find(params[:q])

    respond_to do |format|
      format.json { render json: @wine }
    end
  end

  private

  def text_query(text)
    return if text.blank?

    query_parts = []
    query_param = text.downcase

    if text != ""
      query_parts << "lower(name) LIKE '%#{query_param}%'"
      query_parts << "lower(region) LIKE '%#{query_param}%'"
      query_parts << "lower(variety) LIKE '%#{query_param}%'"
      query_parts << "lower(producer) LIKE '%#{query_param}%'"
      query_parts.join(" OR ")
    end
  end
end
