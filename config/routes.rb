EduApps::Application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :lti_apps, only: [:index, :show]
      resources :categories, only: [:index, :show]
      resources :education_levels, only: [:index, :show]
      resource :sessions, only: [:create, :destroy]
      resources :users, only: [:index, :show, :create, :update] do
        collection do
          put 'update_password'
        end
      end
      resources :organizations, only: [:show] do
        member do
          post 'add_member'
        end
      end
      resources :memberships, only: [:index, :show, :destroy] do
        collection do
          post 'create_organization'
        end
      end
    end
  end
  
  root to: 'home#index'
end
