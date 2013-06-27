module Api
  module V1
    class UsersController < Api::BaseController
      before_filter :restrict_access, only: [:update_password]

      def index
        render json: User.all
      end

      def show
        user = User.where(access_token: params[:id]).first
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
        user = current_user
        if user.update_attributes({
            email: user_params[:email],
            name: user_params[:name]            
          })
          render json: user
        else
          render json: { errors: user.errors.messages }, status: :unprocessable_entity
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
        params.require(:user).permit(:email, :password, :password_confirmation, :name, :access_token)
      end
    end

  end
end