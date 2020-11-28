# frozen_string_literal: true

module MetaTagsHelper # rubocop:disable Style/Documentation
  def meta_title
    content_for?(:meta_title) ? content_for(:meta_title) : 'Gougères'
  end

  def meta_description
    default_meta = "Miam miam, les recettes d'Alice et Hugo pour vous satisfaire !"
    content_for?(:meta_description) ? content_for(:meta_description) : default_meta
  end

  def meta_image
    meta_image = (content_for?(:meta_image) ? content_for(:meta_image) : nil)
    return nil unless meta_image

    meta_image.starts_with?('http') ? meta_image : image_url(meta_image)
  end
end
