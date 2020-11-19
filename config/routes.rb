# frozen_string_literal: true

Rails.application.routes.draw do
  root 'pages#root'

  namespace :admin do
    root 'pages#root'
    resources :recipes, only: %i[index edit update new create] do
      resources :recipe_ingredients, only: :index
    end
    resources :ingredients, only: %i[index create] do
      collection do
        get :most_recent
      end
    end
  end

  resources :recipes, only: %i[index show]
  resources :ingredient_units, only: %i[index]
end
