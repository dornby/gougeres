# frozen_string_literal: true

class WinesController < ApplicationController # rubocop:disable Style/Documentation
  def index
    @wines = Wine.all
  end

  def show
    @wine = Wine.find(params['id'])
  end
end
