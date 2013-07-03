module Api
  module V1
    class UsersController < Api::BaseController
      before_filter :restrict_access, except: [:authenticate, :create]

      def authenticate
        user = User.where(email: params[:email]).first
        if user && user.authenticate(params[:password])
          api_key = user.generate_session_api_key
          render json: { token: api_key.access_token }
        else
          render json: { message: "Invalid email and/or password" }, status: :unprocessable_entity
        end
      end

      def index
        render json: User.all
      end

      def show
        uid = params[:id]
        if uid =~ /^\d+$/
          user = User.where(id: params[:id]).first
        else
          user = ApiKey.user_for(params[:id])
        end
        if user
          render json: user
        else
          render json: { message: "User not found" }, status: :unprocessable_entity
        end
      end

      def create
        user = User.create(user_params)
        if user.new_record?
          render json: { errors: user.errors.messages }, status: :unprocessable_entity
        else
          render json: user
        end
      end

      def update
        uid = params[:id]
        if uid =~ /^\d+$/
          user = User.where(id: params[:id]).first
        else
          user = ApiKey.user_for(params[:id])
        end

        if user.id != current_user.id
          # Here we may want to check to see if the user has rights somehow on modifying someone
          # elses profile. For now, I will throw an error but in the future we can do it here.
          render json: { message: 'Permission denied' }, status: :forbidden
        else
          if user.update_attributes(user_params)
            render json: user
          else
            render json: { errors: user.errors.messages }, status: :unprocessable_entity
          end
        end
      end

      def update_password
        user = current_user
        if user.authenticate(params[:currentPassword])
          if user.update_attributes({
              password: params[:newPassword],
              password_confirmation: params[:newPasswordConfirmation]
            })
            render json: user
          else
            render json: { errors: user.errors.messages }, status: :unprocessable_entity
          end
        else
          render json: { errors: { currentPassword: 'is not correct' }}, status: :unprocessable_entity
        end
      end

      private

      def user_params
        params.require(:user).permit(:name, :email, :password, :password_confirmation)
      end
    end

  end
end