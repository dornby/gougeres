# frozen_string_literal: true

class WineReview < ApplicationRecord # rubocop:disable Style/Documentation
  belongs_to :wine
  belongs_to :reviewer
end
