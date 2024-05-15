Rails.application.routes.draw do
  root to: "calendars#index"
  get 'calendars/calendar_data', to: 'calendars#calendar_data'
  resources :calendars, only: [:index]
end
