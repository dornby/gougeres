# frozen_string_literal: true

class WinesController < ApplicationController # rubocop:disable Style/Documentation
  def index
    @wines = Wine.all.group_by do |wine|
      wine.name[0]
    end
  end

  def show
    @wine = Wine.find(params['id'])
  end
end
