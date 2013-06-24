EduApps::Application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :create, :update]
    end
  end
  
  root to: 'home#index'
end
