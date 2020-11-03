# frozen_string_literal: true

Rails.application.routes.draw do
  root 'homepage#root'
  resources :recipes, only: %i[index show]
end
