# frozen_string_literal: true

Rails.application.routes.draw do
  root "pages#root"

  namespace :admin do
    root "pages#root"
    resources :recipes, only: %i[index edit update new create] do
      resources :recipe_ingredients, only: :index
    end
    resources :ingredients, only: %i[index create show] do
      collection do
        get "/queried_index", to: "ingredients#queried_index"
        get "/last", to: "ingredients#last"
      end
    end
    resources :wines, only: %i[index edit update new create] do
      resources :wine_reviews, only: %i[index]
      resources :wine_taggings, only: %i[index]
    end
    resources :reviewers, only: :show
    resources :wine_tags, only: [:show, :index] do
      collection do
        get "/queried_index", to: "wine_tags#queried_index"
      end
    end
  end

  resources :recipes, only: %i[index show] do
    collection do
      get "/queried_index", to: "recipes#queried_index"
      get "/from_slug", to: "recipes#from_slug"
    end
  end
  resources :wines, only: %i[index show] do
    collection do
      get "/queried_index", to: "wines#queried_index"
      get "/from_slug", to: "wines#from_slug"
    end
  end
  resources :ingredient_units, only: %i[index]
end
