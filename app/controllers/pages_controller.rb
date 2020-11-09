# frozen_string_literal: true

class PagesController < ApplicationController # rubocop:disable Style/Documentation
  def root; end

  def edit; end

  def edit_recipes
    @recipes = Recipe.all
  end
end
