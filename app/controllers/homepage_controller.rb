# frozen_string_literal: true

class HomepageController < ApplicationController # rubocop:disable Style/Documentation
  def root
    @recipes = Recipe.all
  end
end
