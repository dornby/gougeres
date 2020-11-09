# frozen_string_literal: true

Rails.application.routes.draw do
  root 'pages#root'
  get '/edit', to: 'pages#edit'
  get '/edit/recipes', to: 'pages#edit_recipes'

  resources :recipes, only: %i[index show edit new]
end
