# frozen_string_literal: true

class WinesController < ApplicationController # rubocop:disable Style/Documentation
  def index
    @wines = Wine.all.group_by do |wine|
      wine.name[0]
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
end
