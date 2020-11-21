# frozen_string_literal: true

class Reviewer < ApplicationRecord # rubocop:disable Style/Documentation
  validates :name, presence: true

  has_many :wine_reviews
end
