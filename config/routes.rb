# frozen_string_literal: true

Rails.application.routes.draw do
  root 'pages#root'

  namespace :admin do
    root 'pages#root'
    resources :recipes, only: %i[index edit new create]
  end

  resources :recipes, only: %i[index show]
  resources :ingredients, only: %i[index]
  resources :ingredient_units, only: %i[index]
end
