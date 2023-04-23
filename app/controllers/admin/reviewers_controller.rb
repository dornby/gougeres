# frozen_string_literal: true

module Admin
  class ReviewersController < AdminController # rubocop:disable Style/Documentation
    def show
      @reviewer = Reviewer.find(params["id"])
      respond_to do |format|
        format.json { render json: @reviewer }
      end
    end
  end
end
