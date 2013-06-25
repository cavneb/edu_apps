EduApps::Application.routes.draw do
  namespace :api do
    namespace :v1 do
      resource :sessions, only: [:create, :destroy]
      resources :users, only: [:index, :show, :create, :update]
    end
  end
  
  root to: 'home#index'
end
