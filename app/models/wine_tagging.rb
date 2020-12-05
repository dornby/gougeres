# frozen_string_literal: true

class WineTagging < ApplicationRecord # rubocop:disable Style/Documentation
  belongs_to :wine
  belongs_to :wine_tag
end
