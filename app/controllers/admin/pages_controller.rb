# frozen_string_literal: true

module Admin
  class PagesController < AdminController # rubocop:disable Style/Documentation
    def root
      @ingredient = Ingredient.new
    end
  end
end
