# frozen_string_literal: true

module WinesHelper # rubocop:disable Style/Documentation
  def wine_review_class_for(wine)
    if wine.average_review <=5
      "wine-index-review-bad"
    elsif wine.average_review <=6
      "wine-index-review-average-bad"
    elsif wine.average_review <= 8
      "wine-index-review-average"
    elsif wine.average_review <= 9
      "wine-index-review-average-good"
    elsif wine.average_review > 9
      "wine-index-review-good"
    end
  end
end
