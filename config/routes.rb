Rails.application.routes.draw do
  devise_for :users
  root to: "calendars#index"
  get 'calendars/calendar_data', to: 'calendars#calendar_data'
  resources :calendars, only: [:index,:show]
end
