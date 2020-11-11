# frozen_string_literal: true

module Admin
  class AdminController < ApplicationController # rubocop:disable Style/Documentation
    include HttpAuthConcern
  end
end
