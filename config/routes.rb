# frozen_string_literal: true

Rails.application.routes.draw do
  root 'homepage#root'
  resources :recipes
end
